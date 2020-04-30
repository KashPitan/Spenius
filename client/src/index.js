import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import App_dev from "./App-dev";
import State from "./Context/State";

ReactDOM.render(
  <React.StrictMode>
    <State>
      {/* <App /> */}
      <App_dev />
    </State>
  </React.StrictMode>,
  document.getElementById("root")
);
