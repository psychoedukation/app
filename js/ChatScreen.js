import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  AppState
} from 'react-native';
import ChatMessage from './components/ChatMessage';
import NavigationComponent from './components/NavigationComponent';
import ResultList from './components/ResultList';
import ChatRecommendation from './components/ChatRecommendation';

import {appState, generateUUID} from './utils/appState';
import {Icon} from 'react-native-elements';

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
      keyboardHeight: 0,
      appState: AppState.currentState
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
    this.initializeBot(appState.userName);
    
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) &&
        (nextAppState === 'active'))
    {
      appState.userId = generateUUID();
      this.initializeBot(appState.userName);
    }
    
    this.setState({appState: nextAppState});
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
  initializeBot() {
    fetch(
      'https://account.snatchbot.me/channels/api/api/id97164/appVRtherapy/apsWirVsVirus?user_id=' + appState.userId,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => this.sendMessage(appState.userName, false))
      .catch(error => {
        console.error(error);
      });
  }

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
      .then(() => {
        this.setState({message: null});
      })
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
    setTimeout(() => this.refs.list.scrollToEnd(), 10);
    
    const {navigation} = this.props;

    return (
      <View style={styles.mainView}>
        <NavigationComponent showAvatar={true} />
        <View style={styles.messages}>
          <SafeAreaView style={styles.messages}>
            <FlatList
              ref={'list'}
              style={{paddingHorizontal: 26}}
              data={this.state.messages}
              renderItem={({item}) => this.renderMessage(item)}
              keyExtractor={item => 'id' + item.key}
            />
          </SafeAreaView>
        </View>
        <View style={styles.inputView}>
          <View style={styles.textInputView}>
            <TextInput
              ref={'textInput'}
              style={styles.textInput}
              placeholder="Gib deine Antwort ein..."
              onChangeText={text => this.setState({message: text})}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!!this.state.message && this.state.message.length > 0) {
                this.refs.list.scrollToEnd();
                this.refs.textInput.blur();
                this.refs.textInput.clear();
                this.sendMessage(this.state.message);
              }
            }}
            style={styles.sendButtonView}>
            <Icon
              name="send"
              color={!!this.state.message ? '#1DCCB1' : '#ccc'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  renderMessage(message) {
    var positionStyle = { alignItems: 'flex-start' };

    if (message.isRequest) {
      positionStyle.alignItems = 'flex-end';
    }
    
    var json = null;
    
    try {
      json = JSON.parse(message.message);
    }
    catch (e) {
      //console.log(e);
    }
    
    if (json != null) {
      return (
        <ResultList response={json} />
      );
    }
    else if (!message.suggested) {
      return (
        <View key={'key' + message.key} style={positionStyle}>
          <ChatMessage
            isRequest={message.isRequest}
            message={message.message}
          />
        </View>
      );
    } else {
      const text = message.message;

      return (
        <TouchableWithoutFeedback key={'key' + message.key} style={positionStyle}
          onPress={() => {
            message.selected = true;
            this.refs.list.scrollToEnd();
            this.sendMessage(text, false);
          }}>
          <View style={{paddingTop: 8, marginBottom: 4}}>
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
    flex: 1,
  },

  messages: {
    flex: 1,
  },

  inputView: {
    flexDirection: 'row',
    padding: 5,
    borderColor: '#ccc',
    borderTopWidth: 2,
    backgroundColor: '#fff',
  },

  textInputView: {
    flex: 1,
  },

  textInput: {
    height: 56,
    paddingLeft: 16,
    paddingRight: 16,
  },
  sendButtonView: {
    top: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 5,
  },
});
