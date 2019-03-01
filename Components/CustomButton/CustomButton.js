import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = (props)=>{    
    return(
        <TouchableOpacity style={props.style[0]} onPress={props.onPress}>
            <Text  style={props.style[1]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton