import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Apply JWT token to all requests
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "authToken"
    )}`;
    return config;
  },
  (error) => {
    localStorage.removeItem("authToken");
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
