import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PocButton from '../components/PocButton';
import { useGetCounter } from '../api-client/api-client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function CounterScreen() {
  const { data: counter, refetch: refetchCounter } = useGetCounter({});

  return (
    <View style={styles.container}>
      <Text>
        Counter:
        {' '}
        {counter && counter.Value }
      </Text>
      <PocButton title="+1" onPress={refetchCounter} />
    </View>
  );
}
