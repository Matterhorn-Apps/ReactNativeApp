import React from 'react';
import {
  StyleSheet, Text, View, TouchableHighlight
} from 'react-native';

interface PocButtonInterface {
    title: string;
    onPress: () => void;
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    backgroundColor: 'skyblue',
    marginVertical: 30
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    padding: 15
  }
});

export default function PocButton(props: PocButtonInterface): JSX.Element {
  const { onPress, title } = props;
  return (
    <View>
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableHighlight>
    </View>
  );
}
