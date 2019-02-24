import React from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Camera, Permissions } from 'expo';
import { savingUserData } from '../../Config/Firebase/Firebase'

class SavingProfile extends React.Component {
  constructor() {
    super()

    this.state = {
      picUrl: false,
      userName: 'asas',
      userUid : 'sa',
      profilePic : '',
      nextStep: false,
      contactNum : '',
      error : false
    }
  }
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.setState({ userName: this.props.userName, profilePic: this.props.profilePic , userUid : this.props.userUid ,  picUrl: true })
  }

  nextStep() {
    this.setState({ nextStep: true })
  }
  savingDataToFirebase(){
    const { userName , profilePic , userUid , contactNum, error } =  this.state
    if(userName || contactNum === ""){
      this.setState({error : true})
      return
    }
    this.setState({error : false})
    const userObj = {
      userName,
      profilePic,
      contactNum,
      userUid
    }
    savingUserData(userObj).then((result)=>{this.props.navigation.replace('Dashboard');
    })
  }

  render() {
    const { userName, profilePic, userUid, picUrl, nextStep, contactNum, error } = this.state
    return (
      // <View style={{ flex: 1 }}>
      //     <View style={{ flex: 1 }}>
      //       <View style={styles.container}>
      //         <Image
      //           source={picUrl ? {uri : profilePic} :  require('../../images/dummyPic.png')}
      //           style={styles.profilePic}
      //         />
      //         {/* <TouchableOpacity style={styles.uploadPicBtn} onPress={() => { this.changePic() }} >
      //           <Text style={styles.uploadPicBtnText}>Change Your Picture</Text>
      //         </TouchableOpacity> */}
      //       </View>
      //       <View style={{ flex: 0.30, alignItems: 'flex-end' }}>
      //         <TouchableOpacity style={styles.nextPicBtn} onPress={() => { this.nextStep() }}>
      //           <Text style={styles.nextPicBtnText}>Next</Text>
      //         </TouchableOpacity>

      //       </View>
      //     </View>
      //     <View style={{flex : 1}}>
      //       <View style={{ flex: 0.35, marginTop: '25%' }}>
      //         <TextInput
      //           style={styles.input}
      //           placeholder='Enter Your Name'
      //           placeholderTextColor='#535c68'
      //           defaultValue={userName}
      //           onChange = {(e)=>{this.setState({userName : e.nativeEvent.text})}}
      //         />
      //         <TextInput
      //           style={styles.input}
      //           onChange = {(e)=>{this.setState({contactNum : e.nativeEvent.text})}}
      //           placeholder='Enter Your Phone Number'
      //           placeholderTextColor='#535c68'
      //           keyboardType='number-pad'
      //         />
      //       </View>
      //       <View style={{ flex: 0.30, alignItems: 'flex-end', marginRight: 10 }}>
      //         <TouchableOpacity style={styles.nextPicBtn} onPress = {()=>{this.savingDataToFirebase()}}>
      //           <Text style={styles.nextPicBtnText}>Finish</Text>
      //         </TouchableOpacity>
      //       </View>
      //         <View style={{ alignItems : 'center'}}>
      //           <Text style={{color : 'red'  , fontSize : 18}}>All Fields Are Required</Text>
      //         </View>
      //     </View>
      // </View>
      <View style={styles.container}>
          <Image
            source={profilePic ? {uri : profilePic} :  require('../../images/dummyPic.png')}
            style={styles.profilePic}
          />
          <TextInput
            style={styles.input}
            placeholder='Enter Your Name'
            placeholderTextColor='#535c68'
            defaultValue={userName}
            onChange = {(e)=>{this.setState({userName : e.nativeEvent.text})}}
          />
          <TextInput
            style={styles.input}
            onChange = {(e)=>{this.setState({contactNum : e.nativeEvent.text})}}
            placeholder='Enter Your Phone Number'
            placeholderTextColor='#2C3A47'
            keyboardType='number-pad'
          />
          <View style={{alignItems : 'flex-end'}}>
            <TouchableOpacity style={styles.nextPicBtn} onPress = {()=>{this.savingDataToFirebase()}}>
            <Text style={styles.nextPicBtnText}>Finish</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}

}
const mapStateToProps = (state) => {
  return {
    // userName: state.authReducer.user.userName,
    // profilePic : state.authReducer.user.profilePic,
    // userUid : state.authReducer.user.userUid
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingProfile)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // uploadPicBtn: {
  //   alignItems: 'center',
  //   backgroundColor: '#eb2f06',
  //   padding: 10,
  //   marginTop: 10
  // },
  // uploadPicBtnText: {
  //   color: '#fff',
  //   fontSize: 20
  // },
  nextPicBtn: {
    backgroundColor: '#1e3799',
    padding: 15,
    marginTop: 15,
    width: 120,
    alignItems: 'center'
  },
  nextPicBtnText: {
    color: '#fff',
    fontSize: 25,
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom : 30
  },
  input: {
    width: '80%',
    borderRadius: 10,
    borderWidth : 3,
    borderColor: '#2C3A47',
    padding: 8,
    marginTop: 10,
  }

});
