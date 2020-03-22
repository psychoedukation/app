import React from 'react';
import {View, Text} from 'react-native';
import ResultCard from './ResultCard';

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        <ResultCard
          image={{
            uri: 'https://images.unsplash.com/photo-1549633030-89d0743bad01',
          }}
          headline="Positivität"
          shortDesc="Mit einem besseren Mindset ist alles einfacher..."
        />
        <ResultCard
          image={{
            uri: 'https://images.unsplash.com/photo-1584447528608-7817bb50cab8',
          }}
          headline="Ängste überwinden"
          shortDesc="Erfahre mehr darüber, wie du mit Ängsten besser umgehen kannst"
        />
        <ResultCard
          image={{
            uri: 'https://images.unsplash.com/photo-1584447528608-7817bb50cab8',
          }}
          headline="Ängste überwinden"
          shortDesc="Erfahre mehr darüber, wie du mit Ängsten besser umgehen kannst"
        />
      </View>
    );
  }
}
