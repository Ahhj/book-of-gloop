import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
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
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    useRefreshTokens={true}
    cacheLocation={"localstorage"}
  >
    <GlobalStyle />
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
