import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="552641052048-5915d3chqijo529vadv4btbp88818hq1.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);
