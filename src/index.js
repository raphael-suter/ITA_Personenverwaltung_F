import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Pofile";
import Verify from "./Verify";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/sign_in" component={SignIn} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/verify/:token" component={Verify} />
      <Route path="/" component={Profile} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
