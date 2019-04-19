import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import configureStore from "./utils/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <App {...{ store: configureStore() }} />,
  document.getElementById("root")
);

serviceWorker.unregister();
