import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import Svg, {Path, Image} from 'react-native-svg';

export default class NavigationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        <Svg
          width={'100%'}
          height={88.257}
          viewBox="0 0 360 88.257"
          preserveAspectRatio="xMidYMax slice">
          <Path
            fill="#1dccb1"
            d="M0 0h360v77.18s-24.641 11.077-114.641 11.077S0 77.18 0 77.18z"
          />
        </Svg>
        <View style={{position: 'absolute', left: 32, top: 10}}>
          <Icon onPress={() => {}} size={52} color="#fff" name="menu" />
        </View>
        <View
          style={{
            position: 'absolute',
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            left: '50%',
            top: 16,
            transform: [{translateX: -75}]
            
          }}>
          <Image
            style={{width: 180, height: 180}}
            source={require('../assets/img/avatar.png')}
          />
        </View>
      </View>
    );
  }
}
