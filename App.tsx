import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Button
} from 'react-native';
import { AuthSession } from 'expo';
import MatterhornApiClient, { CounterResponse } from './api-client/MatterhornApiClient';
import PocButton from './components/PocButton';
import getEnvVars from './environment';
import PocPrompt from './components/PocPrompt';

const apiBaseUrl = 'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com';
const apiClient: MatterhornApiClient = new MatterhornApiClient(apiBaseUrl);

const { message } = getEnvVars();

const auth0ClientId = '0ngrMLtiiqOeY7ADbMSOq71tYb50LiUc';
const auth0Domain = 'https://matterhorn-prototype.auth0.com';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function retrieveCount(api: MatterhornApiClient, setCount: React.Dispatch<React.SetStateAction<number>>) {
  api.Counter().then((value: CounterResponse) => {
    setCount(value.Value);
  }).catch((reason) => {
    console.log('Request failed!');
    console.log(reason);
  });
}

async function openAuth(setAuthResult: React.Dispatch<any>) {
  const redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
  console.log(`redirectUrl: ${redirectUrl}`);
  const authUrl = `${auth0Domain}/authorize?response_type=token&client_id=${auth0ClientId}&redirect_uri=${redirectUrl}&prompt=login`;
  console.log(`authUrl: ${authUrl}`);
  const result: any = await AuthSession.startAsync({ authUrl });
  setAuthResult(result.params.access_token);
}

async function logout(setAuthResult: React.Dispatch<any>) {
  if (!__DEV__) {
    AuthSession.dismiss();
  }

  setAuthResult('');
}

export default function App() {
  const [count, setCount] = useState(0);
  const [authResult, setAuthResult] = useState('');

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Text>
        Counter:
        {' '}
        {count}
      </Text>
      <PocButton title="Click Me" onPress={() => retrieveCount(apiClient, setCount)} />
      <PocPrompt />
      <Button title="Open Auth0" onPress={() => openAuth(setAuthResult)} />
      <Button title="Sign out" onPress={() => logout(setAuthResult)} />
      <Text>{authResult !== '' ? `Access token: ${authResult}` : 'Not logged in.'}</Text>
    </View>
  );
}
