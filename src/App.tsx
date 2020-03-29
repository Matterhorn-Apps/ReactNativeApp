import React from 'react';
import { RestfulProvider } from 'restful-react';
import getEnvVars from '../environment';
import Main from './views/Main';

const { message, apiUrl } = getEnvVars();

export default function App() {
  return (
    <RestfulProvider base={apiUrl}>
      <Main message={message} />
    </RestfulProvider>
  );
}
