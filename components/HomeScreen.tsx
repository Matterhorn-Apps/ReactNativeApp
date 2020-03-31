import * as React from 'react';
import { Text, View } from 'react-native';

import getEnvVars from '../environment';

const { message } = getEnvVars();

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{message}</Text>
    </View>
  );
}
