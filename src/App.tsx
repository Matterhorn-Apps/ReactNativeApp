import React, { useEffect, useState } from 'react';
import { AppLoading, registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import { Spinner, View } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { useFonts } from '@use-expo/font';

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

function App(): JSX.Element {
  const [user, setUser] = useState<User>(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Load custom fonts required by native-base
  // https://docs.expo.io/guides/using-custom-fonts/
  const [fontsLoaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    // eslint-disable-next-line @typescript-eslint/camelcase
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
  });

  const signIn = async (): Promise<void> => {
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
    cache: new InMemoryCache(),
    onError: ({ networkError }) => {
      if (networkError) {
        console.error((networkError as any).bodyText);
      }
    },
    request: (operation) => {
      const token = user.AccessToken;
      console.log(token);
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
            {(): JSX.Element => <UserScreen user={user} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default registerRootComponent(App);
