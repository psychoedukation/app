import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableHighlight, TextInput} from 'react-native';
import ChatMessage from './components/ChatMessage';

import { appState } from './utils/appState';

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
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      response: null,
    };
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  componentDidMount() {
    this.sendMessage(null);
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  sendMessage(message) {
    fetch(
      'https://account.snatchbot.me/channels/api/api/id97164/appVRtherapy/apsWirVsVirus?user_id=' + appState.userId,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message == null ? "dummy" : message,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => this.handleResponse(responseJson))
      .catch(error => {
        console.error(error);
      });
      
    if (message != null) {
      var messages = this.state.messages;
    
      messages.push({ key: messages.length, isRequest: true, message: message});
    
      this.setState({messages: messages});
    }
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  handleResponse(response) {
    var messages = this.state.messages;
    
    for (var i in response.messages) {
      messages.push({ key: messages.length, isRequest: false, message: response.messages[i].message});
    }
    
    this.setState({messages: messages});
  }

  //----------------------------------------------------------------------------
  /**
  *
  */
  //----------------------------------------------------------------------------
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.messages}>
          <FlatList
            ref={'list'}
            style={styles.messages}
            data={this.state.messages}
            renderItem={({ item }) => this.renderMessage(item)}
          />
        </View>
        <View style={styles.inputView}>
          <View style={styles.textInputView}>
            <TextInput ref={'textInput'}
              style={styles.textInput}
              placeholder="Gib deine Antwort ein..."
              onChangeText={(text) => this.setState({message: text})}
            />
          </View>
          <TouchableHighlight
            onPress={() => {
              this.refs.list.scrollToEnd();
              this.refs.textInput.clear();
              this.sendMessage(this.state.message);
            }}
            style={styles.sendButtonView}>
            <Text style={styles.sendButtonText}>send</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  //----------------------------------------------------------------------------
  /**
  *             <ChatRecommendation selected={false} text="Ich bin traurig." />
            <ChatRecommendation selected={false} text="Ich bin traurig." />
            <ChatRecommendation selected={true} text="Ich bin traurig." />

  */
  //----------------------------------------------------------------------------
  renderMessage(message) {
    var positionStyle = { alignItems: 'flex-start' };
    
    if (message.isRequest) {
      positionStyle.alignItems = 'flex-end';
    }
    
    return (
      <View style={positionStyle}>
        <ChatMessage key={message.key} isRequest={message.isRequest}
          message={message.message} />
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
  mainView: {
    flex: 1
  },
  
  messages: {
    flex: 1
  },
  
  inputView: {
    flexDirection: 'row',
    padding: 5
  },
  
  textInputView: {
    flex: 1,
  },
  
  textInput: {
    height: 56,
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 50,
    paddingLeft: 16,
    paddingRight: 16,
  },
  
  sendButtonView: {
    height: 56,
    borderRadius: 50,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'rgba(3, 63, 101, 0.74)',
    display: 'flex',
    marginLeft: 5
  },
  
  sendButtonText: {
    textAlign: 'center',
    lineHeight: 56,
    color: '#fff',
    fontSize: 18,
  }
  
});