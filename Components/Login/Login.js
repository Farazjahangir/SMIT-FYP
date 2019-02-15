import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from '../../Config/Firebase/Firebase'

export default class Login extends React.Component {


        async loginWithFacebook() {
            console.log('LOGIM');
            
            const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
              '2240305036240222',
              { permissions: ['public_profile' , 'email'] }
            );
          
            if (type === 'success') {
              // Build Firebase credential with the Facebook access token.
              const credential = firebase.auth.FacebookAuthProvider.credential(token);
              // Sign in with credential from the Facebook user.
              firebase.auth().signInAndRetrieveDataWithCredential(credential).then((success)=>{
                // console.log("SUCCESS" , success);
                firebase.auth().onAuthStateChanged((user) => {
                  if (user != null) {
                    console.log("We are authenticated now! ==============>", user);
                  }
                
                  // Do other things
                });
                
              })
              .catch((error) => {
                console.log("ERROR" , error);
                
                // Handle Errors here.
              });
            }
          }

    static navigationOptions = {
        header: null
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SMIT-FYP</Text>
        <TouchableOpacity
            onPress={()=>{this.loginWithFacebook()}}
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
