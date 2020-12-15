import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch} from 'react-redux';
import Colors from '../constants/Colors';
import Screens from '../constants/Screens';
import {logout} from '../redux/actions/AuthActions';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriesScreen from '../screens/CategoriesScreen';
import ArtistsScreen from '../screens/ArtistsScreen';
import MovieListScreen from '../screens/MovieListScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DirectorsScreen from '../screens/DirectorsScreen';
import Foundation from 'react-native-vector-icons/Foundation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.Home}
        component={HomeScreen}
        options={{
          title: 'IMDB',
          headerRight: () => (
            <TouchableOpacity
              style={{
                paddingRight: 15,
                paddingLeft: 15,
                height: '100%',
                justifyContent: 'center',
              }}
              onPress={() => dispatch(logout())}>
              <Ionicons
                name="exit-outline"
                color={Colors.mainColor}
                size={25}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name={Screens.MoviesList} component={MovieListScreen} />
    </Stack.Navigator>
  );
};

const CategoriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.Categories}
        component={CategoriesScreen}
        options={{
          title: 'Categories',
        }}
      />
    </Stack.Navigator>
  );
};

const ArtistsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.Artists}
        component={ArtistsScreen}
        options={{
          title: 'Artists',
        }}
      />
    </Stack.Navigator>
  );
};

const DirectorsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.Artists}
        component={DirectorsScreen}
        options={{
          title: 'Directors',
        }}
      />
    </Stack.Navigator>
  );
};

const TabsNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={Screens.Home}
      component={HomeStack}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({focused, color, size}) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={Screens.Categories}
      component={CategoriesStack}
      options={{
        tabBarLabel: 'Categories',
        tabBarIcon: ({focused, color, size}) => (
          <Octicons name="file-directory" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={Screens.Artists}
      component={ArtistsStack}
      options={{
        tabBarLabel: 'Artists',
        tabBarIcon: ({focused, color, size}) => (
          <Fontisto name="person" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={Screens.Directors}
      component={DirectorsStack}
      options={{
        tabBarLabel: 'Directors',
        tabBarIcon: ({focused, color, size}) => (
          <Foundation name="megaphone" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabsNavigator;
