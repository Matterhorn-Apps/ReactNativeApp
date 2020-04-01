import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RestfulProvider } from 'restful-react';
import { registerRootComponent } from 'expo';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CounterScreen from './views/CounterScreen';
import MainScreen from './views/MainScreen';
import getEnvVars from './utils/environment';

const { apiUrl } = getEnvVars();

/**
 * To type check our route name and params, we need to create an object type
 * with mappings for route name to the params of the route.
 * https://reactnavigation.org/docs/typescript
 */
type RootNavParamList = {
  Main: undefined;
  Counter: undefined;
};

const Tab = createMaterialTopTabNavigator<RootNavParamList>();

function App() {
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
