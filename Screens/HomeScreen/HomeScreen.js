import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {firebase} from  '../../Config/Firebase/Firebase'

export default class HomeScreen extends React.Component {
  render() {
    const userUid = firebase.auth().currentUser.uid;
    console.log('USER-UID' ,  userUid);
    
      console.log(this.props);
      
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
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
});
