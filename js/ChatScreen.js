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
} from 'react-native';
import ChatMessage from './components/ChatMessage';
import NavigationComponent from './components/NavigationComponent';
import ResultCard from './components/ResultCard';
import ChatRecommendation from './components/ChatRecommendation';

import {appState} from './utils/appState';
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
  initializeBot() {
    fetch(
      'https://account.snatchbot.me/channels/api/api/id97164/appVRtherapy/apsWirVsVirus?user_id=' + appState.userId,
      {
        method: 'GET',
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
    console.log(message);
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
      .then(responseJson => { this.handleResponse(responseJson) })
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
    const {navigation} = this.props;

    return (
      <View style={styles.mainView}>
        <NavigationComponent showAvatar={true}></NavigationComponent>
        <View style={styles.messages}>
        <SafeAreaView style={styles.messages}>
          <FlatList
            ref={'list'}
            style={styles.messages}
            data={this.state.messages}
            renderItem={({item}) => this.renderMessage(item)}
            keyExtractor={item => 'id' + item.key}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ResultScreen')}>
            <ResultCard image={require('../assets/img/result_card.png')} headline="Ängste überwinden" shortDesc="Erfahre mehr darüber wie du mit Ängsten besser umgehen kannst"></ResultCard>
          </TouchableOpacity>
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
      console.log(e);
    }
    
    if (json != null) {
      console.log(json.image);
      return (
        <View key={'key' + message.key} style={positionStyle}>
          <ResultCard image={{ uri: json.image }}
            headline={json.headline} shortDesc={json.shortDesc} />
        </View>
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
    flex: 1,
  },

  messages: {
    flex: 1,
    paddingHorizontal: 16,
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
