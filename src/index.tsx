import React from 'react';
import ReactDOM from 'react-dom';
import history from "./utils/history";
import Auth0Provider from "./auth0/Auth0Provider";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';

const DOMAIN: string = process.env.REACT_APP_DOMAIN || "";
const CLIENT_ID: string = process.env.REACT_APP_CLIENT_ID || "";

const client = new ApolloClient({
  uri: 'https://geohospital-api.herokuapp.com',
});

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

import './index.scss';
ReactDOM.render(
  <ApolloProvider client={client}>
    <Auth0Provider
      domain={DOMAIN}
      client_id={CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

