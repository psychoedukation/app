import React from 'react';
import { StyleSheet, Text, View, SectionList, FlatList, TouchableOpacity, Image, ImageBackground} from 'react-native';

import WelcomeScreen from './WelcomeScreen';
import NavigationComponent from './NavigationComponent';

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
      showSplash: true,
      userName: 'toefi'
    }
    
    setTimeout(() => this.setState({showSplash: false}), 1000);
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  render() {
    console.log(this.state);
    
    if (this.state.showSplash) {
      return this.renderSplash();
    }
    else if (this.state.userName == null) {
      return (
        <WelcomeScreen onName={(name) => this.handleUserName(name)}/>
      );
    }
    else {
      return (
        <NavigationComponent userName={this.state.userName} />
      );
    }
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  renderSplash() {
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

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  handleUserName(name) {
    this.setState({userName: name});
  }
}

//------------------------------------------------------------------------------
/**
 * don't forget the styles for this component
 */
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
});

