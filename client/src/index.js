import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import App_dev from "./App-dev";
import State from "./Context/State";
import UserState from "./Context/UserContext/UserState";

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <State>
        {/* <App /> */}
        <App_dev />
      </State>
    </UserState>
  </React.StrictMode>,
  document.getElementById("root")
);
