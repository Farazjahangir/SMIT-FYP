import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {loginWithFacebook} from '../../Config/Firebase/Firebase'

export default class Login extends React.Component {



    static navigationOptions = {
        header: null
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SMIT-FYP</Text>
        <TouchableOpacity
            onPress={()=>{loginWithFacebook().then((user)=>{console.log("LOGEED IN" , user);
            })}}
            style={styles.button}
        >
        <Text style={styles.buttonText}>Login With Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor : '#273c75'
  },
  text : {

      fontSize : 30,
      marginBottom : 12
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4267b2',
    padding: 15
  },
  buttonText : {
      color : '#fff',
      fontSize : 20
  }
});
