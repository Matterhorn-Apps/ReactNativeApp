import React from 'react';
import MatterhornApiClient, { CounterResponse } from './api-client/MatterhornApiClient';
import getEnvVars from './environment';
import { RestfulProvider } from "restful-react";
import Main from './views/Main';

const apiBaseUrl = 'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com';

const { message, apiUrl } = getEnvVars();

export default function App() {
  return (
    <RestfulProvider base={apiUrl}>
      <Main {...message}></Main>
    </RestfulProvider>
  );
}
