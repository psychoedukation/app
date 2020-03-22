import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import Svg, {Path, Image} from 'react-native-svg';

import Chat from './Chat';
import Header from './Header';

export default class NavigationComponent extends React.Component {

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  constructor(props) {
    super(props);
  }

  //----------------------------------------------------------------------------
  /**
   *
   */
  //----------------------------------------------------------------------------
  render() {
    return (
      <View style={styles.mainView}>
        <Header />
        <Chat userName={this.props.userName} />
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
  mainView:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
});
