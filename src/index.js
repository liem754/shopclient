import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "store/redux";
import { PersistGate } from "redux-persist/integration/react";
import { ScrollTop } from "components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ScrollTop />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
