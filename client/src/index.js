import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Palatino Linotype, Book Antiqua, Palatino, serif;
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

// Route the user to the right place after login
const onRedirectCallback = (appState) => {
  const path =
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname;
  return <Redirect to={path} />;
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    onRedirectCallback={onRedirectCallback}
  >
    <GlobalStyle />
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
