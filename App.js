import React from 'react';

import RootScreen from './js/RootScreen';
import WelcomeScreen from './js/WelcomeScreen';
import ChatScreen from './js/ChatScreen';
import ResultScreen from './js/ResultScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
//------------------------------------------------------------------------------
/**
 * create the app providing the redux store to all its children
 */
//------------------------------------------------------------------------------
export default class App extends React.Component {
 
  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="RootScreen" component={RootScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ResultScreen" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
