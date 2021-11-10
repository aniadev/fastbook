import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Redux
import store from "./store/store";
import { Provider } from "react-redux";

function emitMessage(chanel) {
  setInterval(() => {
    var d = new Date();
    window.dispatchEvent(
      new CustomEvent(`chanel-${chanel}`, {
        detail: {
          msg: `Message from chanel ${chanel} at ${
            d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
          }:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}:${
            d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()
          }`,
          origin: Math.round(Math.random()) === 1,
        },
      })
    );
  }, 10000);
}

emitMessage(1);
// emitMessage(3);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
