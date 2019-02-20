import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
}
  render() {    

    return (
      <View style={styles.container}>
       <Image 
          source= {require('../../images/dummyPic.png')}
          style={{width : 200 , height : 200}}
       />
        <TouchableOpacity style={styles.uploadPicBtn}>
          <Text style={styles.uploadPicBtnText}>Change Your Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextPicBtn}>
          <Text style={styles.nextPicBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadPicBtn : {
    alignItems: 'center',
    backgroundColor: '#eb2f06',
    padding: 15,
    marginTop : 15
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
  }

});
