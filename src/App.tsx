import React, { useEffect, useState } from 'react';
import { AppLoading, registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import { Spinner, View } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFonts } from '@use-expo/font';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import MainScreen from './views/MainScreen';
import getEnvVars from './utils/environment';
import Auth, { User } from './utils/auth/auth';
import UserScreen from './views/UserScreen';

const { apiUrl } = getEnvVars();

/**
 * To type check our route name and params, we need to create an object type
 * with mappings for route name to the params of the route.
 * https://reactnavigation.org/docs/typescript
 */
type RootNavParamList = {
  Main: undefined;
  User: undefined;
};

function App() {
  const [user, setUser] = useState<User>(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
  });

  const signIn = async () => {
    setIsLoggingIn(true);
    setUser(await Auth.SignInAsync());
    setIsLoggingIn(false);
  };

  useEffect(() => {
    // Wait until font resources are loaded before redirecting to sign in.
    // This helps avoid incorrect behavior when triggering the auth flow before
    // AppState has initialized. (https://github.com/expo/expo/pull/6743)
    if (fontsLoaded && !isLoggingIn && !user) {
      signIn();
    }
  });

  const Tab = createMaterialTopTabNavigator<RootNavParamList>();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!user) {
    return (
      <View>
        <Spinner />
      </View>
    );
  }

  const apolloClient = new ApolloClient({
    uri: `${apiUrl}/query`,
    request: (operation) => {
      const token = user.AccessToken;
      operation.setContext({
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
    }
  });

  return (
    <ApolloProvider client={apolloClient}>
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
            name="User"
            options={{ title: 'User' }}
          >
            {() => <UserScreen user={user} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default registerRootComponent(App);
