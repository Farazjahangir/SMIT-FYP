import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { loginWithFacebook, checkingUserProfile } from '../../Config/Firebase/Firebase'
import { loginUser } from '../../redux/Actions/authActions'
import { connect } from 'react-redux'

class Login extends React.Component {

  constructor(){
    super()

    this.state = {
      isLogin : true
    }
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount(){
    if(this.props.userObj){
      console.log('Login IF' , this.props);
      this.props.navigation.replace('Dashboard')
    }
    
  }
  componentWillReceiveProps(nextProps){
    const { isLogin } = this.state
    if(nextProps.userObj && isLogin){
      console.log('Login_componentWillReceiveProps' , nextProps);
      this.props.navigation.replace('Dashboard')
    }  
  }

  async login() {
    try {
      console.log('TRY');
      const userData = await loginWithFacebook()
      this.setState({isLogin : false})
      console.log('USerDAta' , userData);
      
      
      let checkingUser = await checkingUserProfile()
      if (checkingUser.exists) {
        console.log('checkingUser.exists' , checkingUser.exists);
        checkingUser =  checkingUser.data()
        this.props.loginUser(checkingUser)
         this.props.navigation.replace('Dashboard')
      }
      else {
        // this.props.loginUser(userData)
        console.log('checkingUser.exists.Else' , checkingUser.exists);
         this.props.navigation.replace('SavingProfile' , {userData : userData})
      }
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
    loginUser: (userData) => dispatch(loginUser(userData))
  }

}
const mapStateToProps = (state) => {
  console.log('MApState' , state.authReducer.user);
  
  return {
    userObj : state.authReducer.user
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
