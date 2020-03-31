import * as React from 'react';
import { Text, View } from 'react-native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { RootNavParamList } from '../App';

import getEnvVars from '../environment';

const { message } = getEnvVars();

type HomeScreenNavigationProp = MaterialTopTabNavigationProp<
  RootNavParamList,
  'Home'
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

// eslint-disable-next-line no-unused-vars
export default function HomeScreen(props: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{message}</Text>
    </View>
  );
}
