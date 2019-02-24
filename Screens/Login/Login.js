import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { loginWithFacebook, checkingUserProfile } from '../../Config/Firebase/Firebase'
import userLogin from '../../redux/Actions/authActions'
import { connect } from 'react-redux'

class Login extends React.Component {
  static navigationOptions = {
    header: null
  }

  async login() {
    try {
      console.log('TRY');
      const userData = await loginWithFacebook()
      const checkingUser = await checkingUserProfile()
      if (checkingUser.exists) {
        console.log('checkingUser.exists' , checkingUser.exists);  
        this.props.navigation.replace('Dashboard')
      }
      else {
        console.log("checkingUser.exists", checkingUser.exists);
        this.props.navigation.replace('SavingProfile')
      }
      this.props.userLogin(userData)
    }
    catch (e) {
      console.log('catch', e);
    }
  }

render() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SMIT-FYP</Text>
      <TouchableOpacity
        onPress={() => { this.login() }}
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
  console.log('MApState', state);

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
  text: {
    fontSize: 40,
    marginBottom: 20,
    fontFamily: 'FredokaOne-Regular',
    // fontWeight : '600',
  },
  button: {
    borderWidth: 2,
    borderColor: '#341f97',
    width: '70%',
    borderRadius: 100,
    alignItems: 'center',
    padding: 15
  },
  buttonText: {
    fontWeight: '900',
    color: '#341f97',
    fontSize: 20
  }
});
