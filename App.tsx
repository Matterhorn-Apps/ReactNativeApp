import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './components/HomeScreen';
import CounterScreen from './components/CounterScreen';

/**
 * To type check our route name and params, we need to create an object type
 * with mappings for route name to the params of the route.
 * https://reactnavigation.org/docs/typescript
 */
type RootStackParamList = {
  Home: undefined;
  Secondary: undefined;
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

function App() {
  return (
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

export default App;
