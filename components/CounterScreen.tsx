import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MatterhornApiClient, { CounterResponse } from '../api-client/MatterhornApiClient';

import getEnvVars from '../environment';
import PocButton from './PocButton';

const { apiUrl } = getEnvVars();
const apiClient: MatterhornApiClient = new MatterhornApiClient(apiUrl);

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

export default function CounterScreen() {
  const [count, setCount] = useState(-1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (count === -1 && !loading) {
      setLoading(true);
      apiClient.Counter().then((response: CounterResponse) => {
        setCount(response.Value);
      }).finally(() => {
        setLoading(false);
      });
    }
  });

  if (count === -1) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text>
        Counter:
        {' '}
        {count}
      </Text>
      <PocButton title="+1" onPress={() => retrieveCount(apiClient, setCount)} />
    </View>
  );
}
