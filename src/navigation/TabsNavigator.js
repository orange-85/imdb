import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Screens from '../constants/Screens';
import ArtistsScreen from '../screens/ArtistsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import DirectorsScreen from '../screens/DirectorsScreen';
import HomeScreen from '../screens/HomeScreen';
import MovieListScreen from '../screens/MovieListScreen';
import SearchPersonResultScreen from '../screens/SearchPersonResultScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const sharedScreens = () => (
  <>
    <Stack.Screen name={Screens.MoviesList} component={MovieListScreen} />
  </>
);

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.Home}
        component={HomeScreen}
        options={{title: 'IMDB'}}
      />
      <Stack.Screen
        name={Screens.SearchPersonResult}
        component={SearchPersonResultScreen}
        options={{title: 'Search'}}
      />
      {sharedScreens()}
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
      {sharedScreens()}
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
      {sharedScreens()}
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
      {sharedScreens()}
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
      name={Screens.Directors}
      component={DirectorsStack}
      options={{
        tabBarLabel: 'Directors',
        tabBarIcon: ({focused, color, size}) => (
          <Foundation name="megaphone" size={size} color={color} />
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
  </Tab.Navigator>
);

export default TabsNavigator;
