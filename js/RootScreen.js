import React from 'react';
import {Text, View, Button, Image} from 'react-native';

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
  }

  componentDidMount() {
    const {navigation} = this.props;
    setTimeout(() => {
      navigation.navigate('WelcomeScreen');
    }, 800);
  }


  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  render() {
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
}
