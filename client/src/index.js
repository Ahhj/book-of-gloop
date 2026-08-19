import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GoogleOAuthProvider } from "./react-google-oauth";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Gill Sans, Arial, sans-serif;
    margin: 0;
  }

  button {
    background: palevioletred;
    color: white;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  }

  section {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
`;

ReactDOM.render(
  <GoogleOAuthProvider
    clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
    scope="email profile https://www.googleapis.com/auth/drive"
  >
    <GlobalStyle />
    <App />
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
