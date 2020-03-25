import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default function PocButton(props) {
    return (
        <View>
            <TouchableHighlight style={styles.button} onPress={props.onPress}>
                    <Text style={styles.buttonText}> {props.title}</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: 'skyblue'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        padding: 15
    },
    spacer: {
        width: 50,
        height: 50
    }
});