/*
 * Copyright (C) SimPaFee UG (haftungsbeschränkt) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Patrick Harms <patrick@barbqapp.de>, 2018-2020
 */

import React from 'react';

import RootScreen from './js/RootScreen';

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
      <RootScreen/>
    );
  }
}
