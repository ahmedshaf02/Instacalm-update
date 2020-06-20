import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
import {store} from "./Redux/store"
import {BrowserRouter} from "react-router-dom"

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
   ,
  rootElement
);
