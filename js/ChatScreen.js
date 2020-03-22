import React from 'react';
import { StyleSheet, Text, View, SectionList, FlatList, TouchableOpacity, Image, ImageBackground} from 'react-native';
import ChatMessage from './components/ChatMessage';


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
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <ChatMessage isRequest="true" message="Ich fühle mich antriebslos." />
        <ChatMessage message="Womit hast du heute Probleme?" />
        <ChatMessage isRequest="true" message="Ich bin traurig." />
      </View>
    );
  }
}
