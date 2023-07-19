import { Form, Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import "./style.css";
import Layout from "../../components/layout/Layout";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const ColorScheme = () => {
  const [datas, setDatas] = useState([]);
  const [rootLips, setRootLips] = useState([]);
  const [afterLips, setAfterLips] = useState([]);
  const [result, setResult] = useState("");
  const [rootLip, setRootLip] = useState("");
  const [afterLip, setAfterLip] = useState("");
  const formRef = React.useRef(null);
  const fileUrl = "./mau.xlsx";
  const onRootSelect = (value, key) => {
    setRootLip(value);
    console.log(`selected ${value} `);
    console.log(key);
  };
  const onAfterSelect = (value, key) => {
    setAfterLip(value);
    console.log(`selected ${value} `);
    console.log(key);
  };
  const onSearch = (value, key) => {
    console.log("search:", value, key);
  };
  useEffect(() => {
    fetch(fileUrl)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        jsonData.shift();
        const roots = [];
        const afters = [];
        const dataTemp = [];
        jsonData.forEach((row) => {
          if (row[8]) {
            const root = roots.find((obj) => obj.value === row[2]);
            dataTemp.push({
              key: row[0],
              value: row[8],
              label: row[7],
              root: row[2],
              after: row[5],
            });
            if (!root) {
              roots.push({ key: row[0], value: row[2], label: row[1] });
            }
            const after = afters.find((obj) => obj.value === row[5]);
            if (!after) {
              afters.push({ key: row[0], value: row[5], label: row[4] });
            }
          }
        });
        setRootLips(roots);
        setAfterLips(afters);
        setDatas(dataTemp);
        // setDatas(jsonData);
        console.log(jsonData[0]);
        // Do something with the imported data
      })
      .catch((error) => {
        console.error("Error importing Excel file:", error);
      });
  }, []);

  // useEffect(() => {
  // console.log(datas[0]);
  // datas.forEach((row, index) => console.log(index));
  // }, []);
  const onFinish = () => {
    const resultTemp = datas.find(
      (data) => data.after === afterLip && data.root === rootLip
    );
    if (resultTemp) {
      console.log(resultTemp.value);
      setResult(resultTemp.value);
    }
  };
  return (
    <div className="container">
      <Form
        className="form"
        {...layout}
        ref={formRef}
        onFinish={onFinish}
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item name="root" label="Màu môi gốc">
          <Select
            showSearch
            placeholder="Chọn màu môi gốc"
            optionFilterProp="children"
            onChange={onRootSelect}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={rootLips}
          />
          <div className="sample" style={{ backgroundColor: rootLip }}></div>
        </Form.Item>
        <Form.Item name="after" label="Màu môi sau bong">
          <Select
            showSearch
            placeholder="Chọn màu môi sau bong"
            optionFilterProp="children"
            onChange={onAfterSelect}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={afterLips}
          />
          <div className="sample" style={{ backgroundColor: afterLip }}></div>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {result ? (
        <div className="sample" style={{ backgroundColor: result }}></div>
      ) : (
        <div>Hiện không có màu này</div>
      )}
    </div>
  );
};
