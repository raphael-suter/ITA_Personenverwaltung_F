import React, { useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import SignIn from "./SignIn";
import Profile from "./Pofile";

const ROOT = "root";
const TOKEN = "token";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN));

  const saveToken = (token) => {
    setToken(token);

    if (token) {
      localStorage.setItem(TOKEN, token);
    } else {
      localStorage.removeItem(TOKEN);
    }
  };

  if (token) {
    return <Profile token={token} saveToken={(token) => saveToken(token)} />;
  } else {
    return <SignIn saveToken={(token) => saveToken(token)} />;
  }
};

ReactDOM.render(<App />, document.getElementById(ROOT));
