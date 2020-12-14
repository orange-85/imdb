import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import Screens from '../constants/Screens';
import LoginScreen from '../screens/LoginScreen';
import TabsNavigator from './TabsNavigator';

const Stack = createStackNavigator();

const RootStackScreen = () => {
  const accessToken = useSelector((state) => state.token);

  return (
    <Stack.Navigator>
      {accessToken ? (
        <Stack.Screen
          name="Tabs"
          component={TabsNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name={Screens.Login}
          component={LoginScreen}
          options={() => ({animationTypeForReplace: 'pop'})}
        />
      )}
    </Stack.Navigator>
  );
};

const theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.mainColor,
  },
};

export const AppNavigator = () => {
  return (
    <NavigationContainer theme={theme}>
      <RootStackScreen />
    </NavigationContainer>
  );
};
