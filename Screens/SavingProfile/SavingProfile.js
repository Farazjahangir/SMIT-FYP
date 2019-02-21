import React from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput  } from 'react-native';

class SavingProfile extends React.Component {
  constructor(){
    super()

    this.state = {
      picUrl : false,
      user : {}
    }
  }
  static navigationOptions = {
    header: null
}

  componentDidMount(){
    this.setState({user : this.props.user , picUrl : true})
    console.log('IMAGEURL' ,  this.props.user);
    
    
  }
  render() {   
    console.log(this.props);
    
    const { user , picUrl } = this.state
    return (
      <View style={{flex : 1}}>
        <View style={styles.container}>
        <Image 
            source= {picUrl ? {uri : user.profilePic} : require('../../images/dummyPic.png')}
            style={styles.profilePic}
        />
          <TouchableOpacity style={styles.uploadPicBtn}>
            <Text style={styles.uploadPicBtnText}>Change Your Picture</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex : 0.35 , marginTop : '25%'}}>
          <TextInput 
            style={styles.input}
            placeholder = 'Enter Your Name'
            placeholderTextColor = '#535c68'
            defaultValue = {user.userName}
          />
          <TextInput 
            style={styles.input}
            placeholder = 'Enter Your Phone Number'
            placeholderTextColor = '#535c68'
            keyboardType = 'number-pad'
          />
        </View>
        <View style={{flex : 0.30 , alignItems : 'flex-end' , marginRight : 10 }}>
          <TouchableOpacity style={styles.nextPicBtn}>
            <Text style={styles.nextPicBtnText}>Next</Text>
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
  console.log('MApState' , state);
  
  return {
    user : state.authReducer.user
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SavingProfile)
const styles = StyleSheet.create({
  container: {
    flex: 0.30,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop : '20%'
  },
  uploadPicBtn : {
    alignItems: 'center',
    backgroundColor: '#eb2f06',
    padding: 10,
    marginTop : 10
  },
  uploadPicBtnText : {
    color : '#fff',
    fontSize : 20
  },
  nextPicBtn : {
    alignItems: 'center',
    backgroundColor: '#1e3799',
    padding: 15,
    marginTop : 15,
    width : 200
  },
  nextPicBtnText : {
    color : '#fff',
    fontSize : 20
  },
  profilePic : {
    width : 150, 
    height : 150,
    borderRadius : 100
  },
  input : {
    width : '90%',
    borderWidth : 2,
    borderColor : '#CAD3C8',
    padding : 6,
    marginTop : 20,
    padding : 10,
    marginLeft : 10
  }

});
