import React from 'react'
import { StyleSheet,Button, FlatList, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';

class SideBar extends React.Component{

    render(){
        console.log("PROPS" , this.props);
        
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{this.props.navigation.push('Dashboard')}}>
                    <Text style={styles.fontSize}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.push('SubmitSkills')}}>
                    <Text style={styles.fontSize}>Submit Your Skill</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(SideBar)

const styles = StyleSheet.create({
    container : {
        marginTop : 10,
        padding : 10,
        backgroundColor : 'blue',
        width: '35%',
        height : '100%',
        position : 'absolute',
        zIndex : 1,
        display : 'none'
    },
    fontSize : {
        fontSize : 23,
        textDecorationLine : 'underline',
        color : 'white',
        marginTop : 40
    }
})