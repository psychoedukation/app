/*
 * Copyright (C) SimPaFee UG (haftungsbeschränkt) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Patrick Harms <patrick@barbqapp.de>, 2018-2020
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

//------------------------------------------------------------------------------
/**
 *
 */
//------------------------------------------------------------------------------
export default class ChatMessage extends React.Component {
  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  constructor(props) {
    super(props);
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  render() {
    const message = this.props.message;
    const specificStyles = this.props.isRequest
      ? styles.chatRequest
      : styles.chatResponse;

    return (
      <View style={{...styles.chatMessage, ...specificStyles}}>
        <Text style={{fontSize: 18}}>{message}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  chatMessage: {
    maxWidth: '90%',
    marginTop: 24,
    padding: 32,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  chatRequest: {
    marginRight: 'auto',
    borderBottomLeftRadius: 0,
    backgroundColor: '#F8F8F8',
  },
  chatResponse: {
    marginLeft: 'auto',
    borderTopRightRadius: 0,
    backgroundColor: '#dee5ea',
  },
});
