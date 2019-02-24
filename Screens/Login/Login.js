import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { loginWithFacebook , checkingUserProfile } from '../../Config/Firebase/Firebase'
import userLogin from '../../redux/Actions/authActions'
import { connect } from 'react-redux'

class Login extends React.Component {
    static navigationOptions = {
        header: null
    }

    login(){
      loginWithFacebook().then((user)=>{
        this.props.userLogin(user)
        checkingUserProfile().then((doc)=>{
          if(doc.exists){
            console.log("IF" , doc.exist);
            
            this.props.navigation.replace('Dashboard')
          }
          else{
            console.log("Else" , doc);
            this.props.navigation.replace('SavingProfile')
          }
        })
      })
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SMIT-FYP</Text>
        <TouchableOpacity
            onPress={()=>{this.login()}}
            style={styles.button}
        >
        <Text style={styles.buttonText}>Login With Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (userUid) => dispatch(userLogin(userUid))
  }
  
}
const mapStateToProps = (state) => {
  console.log('MApState' , state);
  
  return {
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
