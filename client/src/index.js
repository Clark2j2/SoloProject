import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-9u4lqnu1.us.auth0.com"
const clientId = "g13lJ1AFmOmOiEIBhCHbcm3zzQbIE4D3"

ReactDOM.render(
  <Auth0Provider
    domain = {domain}
    clientId = {clientId}
    redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

