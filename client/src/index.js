import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ItemProvider, OwnerProvider } from "./components/context/Context";


ReactDOM.render(
  <React.StrictMode>
    <OwnerProvider>
    <ItemProvider>
      <App />
      </ItemProvider>
      </OwnerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
