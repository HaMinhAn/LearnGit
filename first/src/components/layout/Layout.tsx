import React, { ReactNode } from "react";
import { Redirect } from "react-router";
import "./index.css";
const Layout = (props: { children: ReactNode }) => {
  return <div className="container">{props.children}</div>;
};

export default Layout;
