import React from 'react';
import {View, Text} from 'react-native';
import ResultCard from './ResultCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const response = this.props.response;
    const navigation = this.props.nav;
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: 'rgba(112, 112, 112, 0.3)',
          marginTop: 32,
        }}>
        <Text style={{color: '#4D4D4D', marginVertical: 32, fontSize: 18}}>
          Unsere Materialien können dir dabei helfen, dich im Alltag
          zurechtzufinden.
        </Text>

        <TouchableOpacity onPress={() => {navigation.navigate('ResultScreen',{
          image: {
            uri: response.image,
          },
          headline: response.headline,
          description: response.description
        })}}>
          <ResultCard
            image={{
              uri: response.image,
            }}
            headline={response.headline}
            shortDesc={response.shortDesc}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
