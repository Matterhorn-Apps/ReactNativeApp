import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import styles from '../styles';

export default function PocButton(props) {
    return (
        <View>
            {/* TODO: invoke function passed in on state */}
            <TouchableHighlight style={styles.button} onPress={props.onPress}>
                <View>
                    <Text style={styles.buttonText}> {props.title}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}
