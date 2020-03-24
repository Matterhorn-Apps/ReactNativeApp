import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import MatterhornApiClient, { CounterResponse } from './api-client/MatterhornApiClient';
import PocButton from './poc/components/PocButton';
import Spacer from './poc/components/Spacer';
import styles from './poc/styles';

const apiBaseUrl = 'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com';
const apiClient: MatterhornApiClient = new MatterhornApiClient(apiBaseUrl);

import getEnvVars from './environment';
const { message } = getEnvVars();

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Text>Counter: {count}</Text>
      <Spacer width={50} height={50} />
      <PocButton title='Click Me' onPress={() => retrieveCount(apiClient, setCount)} />
    </View>
  );
}


function retrieveCount(api: MatterhornApiClient, setCount: React.Dispatch<React.SetStateAction<number>>) {
  api.Counter().then((value: CounterResponse) => {
    setCount(value.Value);
  }).catch((reason) => {
    console.log('Request failed!');
    console.log(reason);
  });
}