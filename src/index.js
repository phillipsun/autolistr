import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { unregister } from "./registerServiceWorker";
import ReduxPromise from "redux-promise";
import reducer from "./redux/reducer";
import { createStore, applyMiddleware } from "redux";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducer)}>
    <Router>
      <Router>
        <App />
      </Router>
    </Router>
  </Provider>,
  document.getElementById("root")
);
unregister();
