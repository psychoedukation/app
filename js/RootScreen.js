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
      <View style={{width: '100%', height: '100%', alignItems:'center'}}>
        <View style={{width:'100%',height:'50%',backgroundColor: '#1DCCB1', justifyContent:'center', alignItems:'center'}}>
          <Image
            style={{width: 180, height: 180}}
            source={require('../assets/img/avatar.png')}
          />
        </View>
        <View style={{width:'100%', height:'20%'}}>
        <Image
            style={{width: '100%', overflow:'visible'}}
            source={require('../assets/img/border-image.png')}
          />
        </View>

        <Text style={{fontSize:36, color:'#45718D',paddingTop:20, fontWeight:'bold'}}>Corona Psycare</Text>
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


