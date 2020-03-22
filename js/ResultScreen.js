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
    const shortDesc = route.params.shortDesc;


    return (
      <View style={styles.mainView}>
        <NavigationComponent showAvatar={false} />
        <Image style={styles.headerImage} source={image}></Image>
        <View style={styles.content}>
            <Text style={styles.headline}>{headline}</Text>
            <Text styles={styles.section}>
            Gefahr jedoch bleibt und ist auch für den, der den Tod wünscht, mit leiblichen Schmerzen (Schmerz) verbunden. Das Wort Angst kommt von αγχω und bedeutet drosseln, würgen; lateinisch angor Beklemmung, angustia Enge. Furcht und Angst sind einander ähnlich, aber nicht identisch, auch wenn die Alltagssprache sie meist gleichbedeutend verwendet. Furcht gilt als klar auf eine äußere Gefahr hin ausgerichtet. {"\n"}{"\n"}
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
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
