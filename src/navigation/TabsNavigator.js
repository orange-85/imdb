import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch} from 'react-redux';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Screens from '../constants/Screens';
import {logout} from '../redux/actions/AuthActions';
import ArtistsScreen from '../screens/ArtistsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import DirectorsScreen from '../screens/DirectorsScreen';
import HomeScreen from '../screens/HomeScreen';
import MovieListScreen from '../screens/MovieListScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const sharedScreens = () => (
  <>
    <Stack.Screen name={Screens.MoviesList} component={MovieListScreen} />
    <Stack.Screen name={Screens.SearchResult} component={MovieListScreen} />
  </>
);

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
            <Button
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
            </Button>
          ),
        }}
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
