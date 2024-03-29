import React from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import NavigationComponent from './components/NavigationComponent';
import { CardStyleInterpolators } from '@react-navigation/stack';

//------------------------------------------------------------------------------
/**
 *
 */
//------------------------------------------------------------------------------
export default class ResultScreen extends React.Component {


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

    const {route} = this.props;
    const image = route.params.image;
    const headline = route.params.headline;
    const description = route.params.description;

    return (
      <View style={styles.mainView}>
        <NavigationComponent showAvatar={false} />
        <Image style={styles.headerImage} source={image}></Image>
        <View style={styles.content}>
            <Text style={styles.headline}>{headline}</Text>
            <Text styles={styles.section}>
                {description}
            </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainView: {
      flex: 1,
    },
    headline:{
        fontSize:24,
        marginBottom:20
    },
    headerImage:{
        marginTop:-20,
        width:'100%',
        height:250,
    },
    content:{
        padding:20,
    },
    section:{
        color:'#4D4D4D'
    }
    
  });
