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

    const {navigation} = this.props;

    const image = this.props.image;
    const headline = this.props.headline;
    const shortDesc = this.props.shortDesc;

    return (
      <View style={styles.mainView}>
        <NavigationComponent showAvatar={false} />
        <Image style={styles.headerImage} source={require('../assets/img/result_card.png')}></Image>
        <View style={styles.content}>
            <Text style={styles.headline}>Ängste überwinden</Text>
            <Text styles={styles.section}>
                Der Tod ist uns gewiß, wenn auch nicht sogleich, während wir dies lesen. Auch die Angst vor dem Sterben ist durch Aufschub und Tröstung gemildert (Todespsychologie). {"\n"}{"\n"}
                Gefahr jedoch bleibt und ist auch für den, der den Tod wünscht, mit leiblichen Schmerzen (Schmerz) verbunden. Das Wort Angst kommt von αγχω und bedeutet drosseln, würgen; lateinisch angor Beklemmung, angustia Enge. Furcht und Angst sind einander ähnlich, aber nicht identisch, auch wenn die Alltagssprache sie meist gleichbedeutend verwendet. Furcht gilt als klar auf eine äußere Gefahr hin ausgerichtet. 
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
