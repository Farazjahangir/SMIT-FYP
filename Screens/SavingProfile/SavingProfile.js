import React from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { ImagePicker  } from 'expo';
import { Form, Item, Input, Label } from 'native-base';
import { SavingUserData }  from '../../Config/Firebase/Firebase'
import { makeBlobFromURI } from '../../helper'
import Button from '../../Components/Button/Button'
import userLogin from '../../redux/Actions/authActions'

class SavingProfile extends React.Component {
  constructor() {
    super()

    this.state = {
      userName: '',
      userUid: '',
      profilePicUrl: '',
      profilePicBlob : '',
      nextStep: false,
      contactNum: '',
      error: false,
      image: null,
      blob : false,
    }
  }
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.setState({ userName: this.props.userName, profilePicUrl: this.props.profilePicUrl, userUid: this.props.userUid })
  }

  async pickImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4]
    });

    console.log('Image', result);
    
    if (!result.cancelled) {
      this.setState({profilePicUrl : result.uri})
    }
  };

  async savingDataToFirebase() {
    console.log("Function");
    
    const { userName, profilePicBlob, userUid, contactNum, error, blob } = this.state
    let {  profilePicUrl } = this.state
    console.log('UID' , userUid);
    
    // if (userName || contactNum === "") {
    //   this.setState({ error: true })
    //   return
    // }
    this.setState({ error: false })
    if(!profilePicUrl.startsWith('http')){
        console.log('IF' , profilePicUrl);
        
        await makeBlobFromURI(profilePicUrl).then((blob)=>{
        profilePicUrl = blob
        })    
    }
    const userObj = {
      userName,
      profilePicUrl,
      contactNum,
      userUid,
      blob
    }
    const userData = await SavingUserData(userObj)
    this.props.userLogin(userData)
    
  }

  render() {
    const { userName, profilePicUrl, userUid, nextStep, contactNum, error } = this.state
    return (
      <View style={styles.container}>
        <Image
          source={profilePicUrl ? { uri: profilePicUrl } : require('../../images/dummyPic.png')}
          style={styles.profilePic}
        />
        <Button style={[styles.uploadPicBtn, styles.uploadPicBtnText]} onPress={()=>{this.pickImage()}}>
          Change Your Picture
        </Button>
        <Form>
          <Item floatingLabel style={{ width: '80%' }}>
            <Label>Username</Label>
            <Input
              value={userName ? userName : ''}
              onChange={(e) => { this.setState({ userName: e.nativeEvent.text }) }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Your Contact Num</Label>
            <Input
              onChange={(e) => { this.setState({ contactNum: e.nativeEvent.text }) }}
            />
          </Item>
        </Form>
        <Button style={[styles.finishBtn, styles.finishBtnText]} onPress={()=>{this.savingDataToFirebase()}}>
         Finish
        </Button>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      userLogin: (userData) => dispatch(userLogin(userData))
    }

}
const mapStateToProps = (state) => {

  return {
    userName: state.authReducer.user.userName,
    profilePicUrl : state.authReducer.user.profilePic,
    userUid : state.authReducer.user.userUid
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingProfile)
const styles = StyleSheet.create({
  container: {
    marginTop : 50,
    flex: 1,
    alignItems: 'center'
  },
  profilePic: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginBottom: 30
  },
  uploadPicBtn: {
    marginTop : 10,
    borderWidth: 2,
    borderColor: '#0984e3',
    borderRadius: 10,
    backgroundColor: '#0984e3',
    width: '60%',
    padding: 10,
    alignItems: 'center'
  },
  uploadPicBtnText: {
    color: '#fff',
    fontSize: 18,
  },
  finishBtn: {
    marginTop : 15,
    borderWidth: 2,
    borderColor: '#6ab04c',
    borderRadius: 10,
    backgroundColor: '#6ab04c',
    width: '60%',
    padding: 10,
    alignItems: 'center'
  },
  finishBtnText: {
    color: '#fff',
    fontSize: 18,
  }
});
