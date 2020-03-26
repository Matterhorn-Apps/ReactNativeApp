import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MatterhornApiClient, { CounterResponse } from './api-client/MatterhornApiClient';
import PocButton from './components/PocButton';
import getEnvVars from './environment';
import {useGetCounter, Counter} from './api-client/api-client'
import { useGet } from "restful-react";

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

  const { data: counter2 } = useGet({
    path: "http://matterhornapiservice-env-dev.eba-qjezc5kq.us-east-1.elasticbeanstalk.com/counter",
  });


  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Text>Counter: {counter2 ? counter2.Value : ''}</Text>
      <PocButton title='Click Me' onPress={() => retrieveCount(apiClient, setCount)} />
    </View>
  );
}
