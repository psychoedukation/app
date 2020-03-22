/*
 * Copyright (C) SimPaFee UG (haftungsbeschränkt) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Patrick Harms <patrick@barbqapp.de>, 2018-2020
 */

import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

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
  componentDidMount() {
    
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  render() {
    const message = this.props.message;
    return (
      <View style={this.props.isRequest ? styles.chatRequest : styles.chatResponse}>
        <Text>{message}</Text>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  chatRequest: {
    width: 260,
    padding: 32,
    borderRadius: 24,
    borderTopRightRadius: 0,
    backgroundColor: 'rgba(69, 113, 141, 0.18)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  chatResponse: {
    width: 260,
    padding: 32,
    borderRadius: 24,
    borderBottomLeftRadius: 0,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
