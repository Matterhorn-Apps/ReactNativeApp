import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

import getEnvVars from '../utils/environment';

const { message } = getEnvVars();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
}
