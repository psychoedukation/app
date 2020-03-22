import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableHighlight, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
import ChatMessage from './components/ChatMessage';
import ChatRecommendation from './components/ChatRecommendation';

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
      keyboardHeight: 0
    };
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    this.sendMessage(appState.userName, false);
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  keyboardWillShow = (e) => {
    var newKeyboardHeight = e.endCoordinates.height;
    
    if ((Platform.OS === 'android') && (!__DEV__)) {
      // on android, we let the system take over
      newKeyboardHeight = 0;
    }
    
    this.setState({ keyboardHeight: newKeyboardHeight });
    
    setTimeout(() => {
      if ((typeof this.refs.list != 'undefined') &&
          (this.refs.list != null))
      {
        this.refs.list.scrollToEnd();
      }
    }, 10);
  };

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  keyboardWillHide = (e) => {
    this.setState({ keyboardHeight: 0 });
    setTimeout(() => {
      if ((typeof this.refs.list != 'undefined') &&
          (this.refs.list != null))
      {
        this.refs.list.scrollToEnd();
      }
    }, 10);
  };

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  sendMessage(message, display = true) {
    fetch(
      'https://account.snatchbot.me/channels/api/api/id97164/appVRtherapy/apsWirVsVirus?user_id=' + appState.userId,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => this.handleResponse(responseJson))
      .catch(error => {
        console.error(error);
      });
      
    if (display) {
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
    console.log(response);
    
    var messages = this.state.messages;
    
    for (var i in response.messages) {
      messages.push({ key: messages.length, isRequest: false, message: response.messages[i].message});
    }
    
    for (var i in response.suggested) {
      messages.push({ key: messages.length, suggested: true, message: response.suggested[i]});
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
            keyExtractor={item => 'id' + item.key}
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
              this.refs.textInput.blur();
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
    
    if (!message.suggested) {
      return (
        <View key={'key' + message.key} style={positionStyle}>
          <ChatMessage isRequest={message.isRequest}
            message={message.message} />
        </View>
      );
    }
    else {
      const text = message.message;
      
      return (
        <TouchableWithoutFeedback key={'key' + message.key} style={positionStyle}
          onPress={() => {
            message.selected = true;
            this.refs.list.scrollToEnd();
            this.sendMessage(text, false);
          }}>
          <View>
            <ChatRecommendation selected={message.selected} text={text} />
          </View>
        </TouchableWithoutFeedback>
      );
    }
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
    marginLeft: 5
  },
  
  sendButtonText: {
    textAlign: 'center',
    lineHeight: 56,
    color: '#fff',
    fontSize: 18,
  }
  
});