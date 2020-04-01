import * as React from 'react';
import { Text, View } from 'react-native';

import getEnvVars from '../environment';

const { message } = getEnvVars();

// eslint-disable-next-line no-unused-vars
export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{message}</Text>
    </View>
  );
}
