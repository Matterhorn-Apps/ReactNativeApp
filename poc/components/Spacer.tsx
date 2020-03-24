import React from 'react';
import { View } from 'react-native';

export default function Spacer(props) {
    return (
        <View style={{width: props.width ?? 0, height: props.height ?? 0}}/>
    );
}
