/*
 * Copyright (C) SimPaFee UG (haftungsbeschränkt) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Patrick Harms <patrick@barbqapp.de>, 2018-2020
 */

import React from 'react';

import RootScreen from './js/RootScreen';
import WelcomeScreen from './js/WelcomeScreen';
import ChatScreen from './js/ChatScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
//------------------------------------------------------------------------------
/**
 * create the app providing the redux store to all its children
 */
//------------------------------------------------------------------------------
export default class App extends React.Component {
 
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RootScreen" component={RootScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
