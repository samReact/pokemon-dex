import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//appolo gql
import { ApolloProvider } from "@apollo/client";
import { client } from "./gql/client";
//redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import appReducer from "./store/appReducer";

const store = createStore(appReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
