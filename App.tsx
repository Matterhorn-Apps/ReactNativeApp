import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MatterhornApiClient, { CounterResponse } from './api-client/MatterhornApiClient';
import PocButton from './components/PocButton';
import getEnvVars from './environment';
import PocPrompt from './components/PocPrompt';

const apiBaseUrl = 'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com';
const apiClient: MatterhornApiClient = new MatterhornApiClient(apiBaseUrl);

const { message } = getEnvVars();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Text>Counter: {count}</Text>
      <PocButton title='Click Me' onPress={() => retrieveCount(apiClient, setCount)} />
      <PocPrompt />
    </View>
  );
}
