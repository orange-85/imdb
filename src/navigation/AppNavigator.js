import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Screens from '../constants/Screens';
import {logout} from '../redux/actions/AuthActions';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const RootStackScreen = () => {
  const accessToken = useSelector((state) => state.token);
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      {accessToken ? (
        <Stack.Screen
          name={Screens.Home}
          component={HomeScreen}
          options={() => ({
            title: 'IMDB',
            headerRight: () => (
              <TouchableOpacity
                style={{paddingRight: 10}}
                onPress={() => dispatch(logout())}>
                <Text>Logout</Text>
              </TouchableOpacity>
            ),
          })}
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

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
