import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

class SubmitSkills extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.head}>Post About Your Skill</Text>
        <TextInput
             style={styles.input}
             placeholder='Enter Your Skill Type'
             placeholderTextColor='#535c68'
        />
        <TextInput
            style={styles.input}
            placeholder='Tell Us About Your Skill'
            placeholderTextColor='#535c68'
            multiline = {true}
            numberOfLines = {6}
        />
        <TextInput
            style={styles.input}
            placeholder='Rate'
            placeholderTextColor='#535c68'
        />
        <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SubmitSkills

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    input: {
      width: '90%',
      borderWidth: 2,
      borderColor: '#CAD3C8',
      padding: 6,
      marginTop: 20,
      padding: 10,
      marginLeft: 10,
      marginTop : 40
    },
    head : {
        marginTop : 30,
        alignItems : 'center',
        fontSize : 20
    },
    submitBtn : {
        borderWidth : 1,
        borderColor : 'blue',
        backgroundColor : 'blue',
        borderRadius : 10,
        marginTop : 30,
        width : 120,
        alignItems : 'center'
    },
    submitBtnText : {
        color : '#fff',
        padding : 10,
        fontSize : 19,
    }
  
  });
  
