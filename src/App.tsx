import React from 'react';
import { RestfulProvider } from 'restful-react';
import { registerRootComponent } from 'expo';
import getEnvVars from '../environment';
import Main from './views/Main';

const { message, apiUrl } = getEnvVars();

function App() {
  return (
    <RestfulProvider base={apiUrl}>
      <Main message={message} />
    </RestfulProvider>
  );
}


export default registerRootComponent(App);
