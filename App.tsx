import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MatterhornApiClient, { CounterResponse } from './api-client/MatterhornApiClient';

const apiBaseUrl = 'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com';
const apiClient: MatterhornApiClient = new MatterhornApiClient(apiBaseUrl);

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Counter: {count}</Text>
      <Button onPress={() => retrieveCount(apiClient, setCount)} title="Click me"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function retrieveCount(api: MatterhornApiClient, setCount: React.Dispatch<React.SetStateAction<number>>) {
  api.Counter().then((value: CounterResponse) => {
    setCount(value.Value);
  }).catch((reason) => {
    console.log('Request failed!');
    console.log(reason);
  });
}