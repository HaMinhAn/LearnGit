import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Auth from "./components/views/Auth";
import LoginForm from "./components/login/LoginForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route exact path="/login" component={LoginForm} />
        <Route
          exact
          path="/register"
          render={(props) => <Auth {...props} authRoute="register" />}
        />
      </Switch>
    </Router>
  );
}

export default App;
