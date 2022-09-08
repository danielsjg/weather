// React
import React from 'react';

// Libraries
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Home from '~/screens/Home';

const StackScreens = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const AppRoutes: React.FC = () => {
  return <StackScreens />;
};

export default AppRoutes;
