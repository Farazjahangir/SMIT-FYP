import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { loginWithFacebook, checkingUserProfile } from '../../Config/Firebase/Firebase'
import { loginUser } from '../../redux/Actions/authActions'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'

import CustomButton from '../../Components/CustomButton/CustomButton'
class Login extends React.Component {

  constructor(){
    super()

    this.state = {
      isLogin : true,
      isLoading : false
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
    // const { isLogin } = this.state
    if(nextProps.userObj){
      console.log('Login_componentWillReceiveProps' , nextProps);
      this.props.navigation.replace('Dashboard')
    }  
  }

  async login() {
    this.setState({isLoading : true})
    try {
      console.log('TRY');
      const userData = await loginWithFacebook()
      // this.setState({isLogin : false})
      console.log('USerDAta' , userData);
      
      
      let checkingUser = await checkingUserProfile()
      if (checkingUser.exists) {
        console.log('checkingUser.exists' , checkingUser.exists);
        checkingUser =  checkingUser.data()
        this.props.loginUser(checkingUser)
         this.props.navigation.replace('Dashboard')
         this.setState({isLoading : false})
      }
      else {
        console.log('checkingUser.exists.Else' , checkingUser.exists);
         this.props.navigation.replace('SavingProfile' , {userData : userData})
         this.setState({isLoading : false})
      }
    }
    catch (e) {
      console.log('catch', e);
    }
  }
  render() {
    const { isLoading } = this.state
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SMIT-FYP</Text>
      <CustomButton
        title={'Login With Facebook'}
        onPress={() => { this.login() }}
        style = {[styles.button , styles.buttonText]}
      />
      {isLoading && <Spinner color={'blue'} />}
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
    borderColor: '#0984e3',
    width: '70%',
    borderRadius: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor : '#0984e3'
  },
  buttonText: {
    fontWeight: '900',
    color: '#fff',
    fontSize: 20
  }
});
