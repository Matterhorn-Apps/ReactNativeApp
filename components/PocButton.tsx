import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

interface PocButtonInterface {
    title: string;
    onPress: () => void;
}

export default function PocButton(props: PocButtonInterface) {
    return (
        <View>
            <TouchableHighlight style={styles.button} onPress={props.onPress}>
                <Text style={styles.buttonText}> {props.title}</Text>
            </TouchableHighlight>
        </View>
    );
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