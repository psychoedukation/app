import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class ChatRecommendation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const text = this.props.text;
    const selectionStyles = this.props.selected
      ? styles.selected
      : styles.unselected;
    return (
      <View style={{...styles.bubble, ...selectionStyles}}>
        <Text style={{fontSize: 18, lineHeight: 52, opacity: 0.4}}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bubble: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    borderWidth: 2,
    elevation: 3,
  },
  selected: {
    borderColor: '#1DCCB1',
  },
  unselected: {
    borderColor: '#fff',
  },
});
