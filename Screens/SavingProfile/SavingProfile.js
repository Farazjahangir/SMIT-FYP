import React from 'react';
import { connect } from 'react-redux'
import { Constants, Location, Permissions } from 'expo';

import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { ImagePicker  } from 'expo';
import { Form, Item, Input, Label } from 'native-base';
import { SavingUserData }  from '../../Config/Firebase/Firebase'
import { makeBlobFromURI } from '../../helper'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { loginUser } from '../../redux/Actions/authActions'

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
      location: null,
      errorMessage: null,
      isLoading : false
    }
  }

  componentDidMount() {
    console.log('SAvingProfile' , this.props);
    
    const { userName , userUid, profilePicUrl } = this.props.navigation.state.params.userData
    
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
      
      this.setState({ userName, profilePicUrl , userUid })
  }

  // Gettiing Permission To Get User Location
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true });
    this.setState({ location });
  };


  // Function For Upload Image From Gallery
  async pickImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4]
    });
    if (!result.cancelled) {
      this.setState({profilePicUrl : result.uri})
    }
  };

  async savingDataToFirebase() {
    this.setState({isLoading : true})
    const { userName, userUid, contactNum, error, location } = this.state
    let {  profilePicUrl } = this.state

    if (userName === "" || contactNum === "") {
      this.setState({ error: true })
      return
    }
    this.setState({ error: false })
    if(!profilePicUrl.startsWith('http')){
      // Function To Change Image Path In Blob 
        await makeBlobFromURI(profilePicUrl).then((blob)=>{
        profilePicUrl = blob
        })    
    }
    const userObj = {
      userName,
      profilePicUrl,
      contactNum,
      userUid,
      lat : location.coords.latitude,
      long : location.coords.longitude
    }
    const userData = await SavingUserData(userObj)
    await this.props.loginUser(userData)
    this.props.navigation.replace('Dashboard')
    this.setState({isLoading : false})
    
  }

  render() {
    const { userName, profilePicUrl, isLoading, error } = this.state
    
    return (
      <View style={styles.container}>
        <Image
          source={profilePicUrl ? { uri: profilePicUrl } : require('../../images/dummyPic.png')}
          style={styles.profilePic}
        />
        <CustomButton
          title={'Change Your Picture'} 
          style={[styles.uploadPicBtn, styles.uploadPicBtnText]} 
          onPress={()=>{this.pickImage()}}/>
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
              keyboardType = {'number-pad'}
              maxLength = {11}
            />
          </Item>
        </Form>
        <CustomButton
          title={'Finish'}
          style={[styles.finishBtn, styles.finishBtnText]} 
          onPress={()=>{this.savingDataToFirebase()}}
        />
        {error && <Text style={{fontSize : 18 , color : 'red'}}>All Fields Are Compulsory</Text>}
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

  return {
    // userObj : state.authReducer.user
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
