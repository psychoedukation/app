/*
 * Copyright (C) SimPaFee UG (haftungsbeschränkt) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Patrick Harms <patrick@barbqapp.de>, 2018-2020
 */

import React from 'react';
import {View} from 'react-native';
import ChatMessage from './components/ChatMessage';
import ChatRecommendation from './components/ChatRecommendation';
import {ScrollView} from 'react-native-gesture-handler';
import ResultList from './components/ResultList';

//------------------------------------------------------------------------------
/**
 *
 */
//------------------------------------------------------------------------------
export default class ChatScreen extends React.Component {
  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  constructor(props, navigation) {
    super(props);

    this.state = {
      response: null,
    };
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  componentDidMount() {
    fetch(
      'https://snatchbot.me/channels/api/api/id97135/appPatrick-Test/apstestpw?user_id=patrick',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Toefi',
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({response: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
  }

  //----------------------------------------------------------------------------
  /**
  *
  */
  //----------------------------------------------------------------------------
  render() {
    var response = '';
    if (this.state.response != null) {
      response = this.state.response.messages[0].message;
    }

    return (
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            padding: 32,
          }}>
          <ChatMessage isRequest="true" message="Ich fühle mich antriebslos." />
          <ChatMessage message="Womit hast du heute Probleme?" />
          <ChatMessage isRequest="true" message="Ich bin traurig." />
          <ResultList />
          <ScrollView>
          <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
            <ChatRecommendation selected={false} text="Ich bin traurig." />
            <ChatRecommendation selected={false} text="Ich bin traurig." />
            <ChatRecommendation selected={true} text="Ich bin traurig." />
          </View>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}
