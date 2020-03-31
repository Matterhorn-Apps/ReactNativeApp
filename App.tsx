import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Button
} from 'react-native';
import { AuthSession } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MatterhornApiClient, { CounterResponse } from './api-client/MatterhornApiClient';

import CounterScreen from './components/CounterScreen';
import HomeScreen from './components/HomeScreen';
import PocButton from './components/PocButton';
import PocPrompt from './components/PocPrompt';

import getEnvVars from './environment';

/**
 * To type check our route name and params, we need to create an object type
 * with mappings for route name to the params of the route.
 * https://reactnavigation.org/docs/typescript
 */
export type RootNavParamList = {
  Home: undefined;
  Counter: undefined;
};

const auth0ClientId = '0ngrMLtiiqOeY7ADbMSOq71tYb50LiUc';
const auth0Domain = 'https://matterhorn-prototype.auth0.com';

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

async function openAuth(setAuthResult: React.Dispatch<any>) {
  const redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
  console.log(`redirectUrl: ${redirectUrl}`);
  const authUrl = `${auth0Domain}/authorize?response_type=token&client_id=${auth0ClientId}&redirect_uri=${redirectUrl}&prompt=login`;
  console.log(`authUrl: ${authUrl}`);
  const result: any = await AuthSession.startAsync({ authUrl });
  setAuthResult(result.params.access_token);
}

async function logout(setAuthResult: React.Dispatch<any>) {
  if (!__DEV__) {
    AuthSession.dismiss();
  }

  setAuthResult('');
}

export default function App() {
  const [count, setCount] = useState(0);
  const [authResult, setAuthResult] = useState('');
  const Tab = createMaterialTopTabNavigator<RootNavParamList>();
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          labelStyle: { fontSize: 12 },
          tabStyle: { marginTop: 30 },
          style: { backgroundColor: 'powderblue' }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="Counter"
          component={CounterScreen}
          options={{ title: 'Counter' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
