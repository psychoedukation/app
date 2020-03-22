import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

export default class ResultCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const image = this.props.image;
    const headline = this.props.headline;
    const shortDesc = this.props.shortDesc;

    return (

      <View
        style={{
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          borderRadius: 10,
          backgroundColor: '#fff',
          overflow: 'hidden',
          marginBottom: 32,
        }}>
          <Image style={{width: '100%', height: 124}} source={image} />
          <Text style={{fontSize: 24, paddingHorizontal: 32, paddingVertical: 8}}>
            {headline}
          </Text>
          <Text
            style={{paddingHorizontal: 32, paddingBottom: 32, color: '#808080'}}>
            {shortDesc}
          </Text>
      </View>
    );
  }
}
