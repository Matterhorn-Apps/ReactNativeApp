import React, { useEffect, useState } from 'react';
import { AuthSession, AppLoading, registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { RestfulProvider } from 'restful-react';

import { Spinner, View } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFonts } from '@use-expo/font';

import CounterScreen from './views/CounterScreen';
import MainScreen from './views/MainScreen';
import getEnvVars from './utils/environment';

const {
  apiUrl, auth0ClientId, auth0Domain, enableAuth
} = getEnvVars();

/**
 * To type check our route name and params, we need to create an object type
 * with mappings for route name to the params of the route.
 * https://reactnavigation.org/docs/typescript
 */
type RootNavParamList = {
  Main: undefined;
  Counter: undefined;
};

async function openAuth(setUserToken: React.Dispatch<string>) {
  const redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
  console.log(`redirectUrl: ${redirectUrl}`);
  const authUrl = `${auth0Domain}/authorize?response_type=token&client_id=${auth0ClientId}&redirect_uri=${redirectUrl}&prompt=login`;
  console.log(`authUrl: ${authUrl}`);
  const result: any = await AuthSession.startAsync({ authUrl });
  setUserToken(result.params.access_token);
}

function App() {
  const [userToken, setUserToken] = useState<string>(enableAuth ? null : 'FAKE_TOKEN');

  const [fontsLoaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
  });

  useEffect(() => {
    if (userToken === null) {
      openAuth(setUserToken);
    }
  });

  const Tab = createMaterialTopTabNavigator<RootNavParamList>();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (userToken === null) {
    return (
      <View>
        <Spinner />
      </View>
    );
  }

  return (
    <RestfulProvider base={apiUrl}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Main"
          tabBarOptions={{
            labelStyle: { fontSize: 12 },
            tabStyle: { marginTop: 30 },
            style: { backgroundColor: 'powderblue' }
          }}
        >
          <Tab.Screen
            name="Main"
            component={MainScreen}
            options={{ title: 'Main' }}
          />
          <Tab.Screen
            name="Counter"
            component={CounterScreen}
            options={{ title: 'Counter' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RestfulProvider>
  );
}

export default registerRootComponent(App);
