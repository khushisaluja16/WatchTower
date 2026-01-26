import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "antd/dist/reset.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div style={{ margin: 0 }}>
      <App />
    </div>
  </BrowserRouter>
);
