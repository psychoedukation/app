/*
 * Copyright (C) SimPaFee UG (haftungsbeschränkt) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Patrick Harms <patrick@barbqapp.de>, 2018-2020
 */

import React from 'react';
import { StyleSheet, Text, View, SectionList, FlatList, TouchableOpacity, Image, ImageBackground} from 'react-native';

//------------------------------------------------------------------------------
/**
 *
 */
//------------------------------------------------------------------------------
export default class RootScreen extends React.Component {

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  constructor(props) {
    super(props);
    
    this.state = {
      response: null
    }
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  componentDidMount() {
    fetch('https://snatchbot.me/channels/api/api/id97135/appPatrick-Test/apstestpw?user_id=patrick', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Toefi'
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({response: responseJson});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  render() {
    
    var response = "";
    if (this.state.response != null) {
      response = this.state.response.messages[0].message;
    }
    
    return (
      <View style={{width: 250}}>
        <Text>Hallo Test</Text>
        <Text>{response}</Text>
      </View>
    );

  }

}

//------------------------------------------------------------------------------
/**
 * don't forget the styles for this component
 */
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
});


