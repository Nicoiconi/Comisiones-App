import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/index";
import { BrowserRouter } from "react-router-dom";
import App from "./componentes/App/App";
import { PersistGate } from "redux-persist/integration/react";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
    </Provider>
  </BrowserRouter >
);
