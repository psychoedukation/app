import React from 'react';
import {View, TextInput, Image, Text, TouchableHighlight} from 'react-native';
import {StackActions} from '@react-navigation/native';
import { appState } from './utils/appState';

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null
    };
  }

  componentDidMount() {}

  render() {
    const {navigation} = this.props;

    return (
      <View style={{width: '100%', height: '100%'}}>
        <View
          style={{
            width: '100%',
            height: '40%',
            backgroundColor: '#1DCCB1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 180, height: 180}}
            source={require('../assets/img/avatar.png')}
          />
        </View>
        <View style={{width: '100%', height: '10%'}}>
          <Image
            style={{width: '100%', overflow: 'visible'}}
            source={require('../assets/img/border-image.png')}
          />
        </View>
        <View
          style={{
            height: '50%',
            paddingTop: 64,
            paddingLeft: 32,
            paddingRight: 32,
            paddingBottom: 64,
          }}>
          <TextInput
            style={{
              height: 56,
              borderWidth: 1,
              borderColor: '#707070',
              marginBottom: 64,
              borderRadius: 50,
              paddingLeft: 16,
              paddingRight: 16,
            }}
            placeholder="Wie heißt du?"
            onChangeText={text => this.setState({name: text})}
          />
          <TouchableHighlight
            onPress={() => {
              if (!!this.state.name) {
                appState.userName = this.state.name;
                navigation.dispatch(StackActions.replace('ChatScreen'));
              }
            }}
            style={{
              height: 56,
              borderRadius: 50,
              paddingLeft: 16,
              paddingRight: 16,
              backgroundColor: !!this.state.name
                ? 'rgba(3, 63, 101, 0.74)'
                : 'rgba(3, 63, 101, 0.4)',
              display: 'flex',
            }}>
            <Text
              style={{
                textAlign: 'center',
                lineHeight: 56,
                color: '#fff',
                fontSize: 18,
              }}>
              Start
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
