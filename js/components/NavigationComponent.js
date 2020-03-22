import React from 'react';
import {View, Image, SafeAreaView, Platform, StyleSheet, StatusBar} from 'react-native';
import {Icon} from 'react-native-elements';
import Svg, {Path} from 'react-native-svg';

export default class NavigationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const showAvatar = this.props.showAvatar;
    let image;

    if(showAvatar){
      image = <Image style={{width: 130, height: 130}} source={require('../../assets/img/avatar.png')} />
    }

    let navHeight = 88.257;
    styles.burgerIcon.top = 12;
    styles.imageContainer.top = 8;

    if(Platform.OS === 'ios'){
      navHeight = 130;
      styles.burgerIcon.top = 35;
      styles.imageContainer.top = 8;
    }

    return (
      <View style={{justifyContent: 'center', marginBottom: 20}}>
        <Svg
          width={'100%'}
          height={navHeight}
          viewBox="0 0 360 88.257"
          preserveAspectRatio="xMidYMax slice">
          <Path
            fill="#1dccb1"
            d="M0 0h360v77.18s-24.641 11.077-114.641 11.077S0 77.18 0 77.18z"
          />
        </Svg>
        <View style={styles.burgerIcon}>
          <Icon onPress={() => {}} size={52} color="#fff" name="menu" />
        </View>
        <View
          style={styles.imageContainer}>
          {image}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  burgerIcon:{
    position: 'absolute', 
    left: 32,
  },
  imageContainer:{
    position: 'absolute',
    width: 150,
    height: 150,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    left: '50%',
    transform: [{translateX: -75}],
  }
})
