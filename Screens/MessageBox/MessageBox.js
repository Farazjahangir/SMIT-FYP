import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Item, Input } from 'native-base';
import CustomeButton from '../../Components/CustomButton/CustomButton'
import CustomeHeader from '../../Components/CustomHeader/CustomHeader'

class MessageBox extends Component {

  // componentDidMount(){
  //   console.log('Login' , this.props);
  //   if(this.props.userObj){
  //     this.props.navigation.replace('Dashboard')
  //   }
    
  // }
  // componentWillReceiveProps(nextProps){
  //   console.log('componentWillReceiveProps' , nextProps);
  //   if(nextProps.userObj){
  //     this.props.navigation.replace('Dashboard')
  //   }
    
  // }

  render() {
      console.log('Message' , this.props);
      
    return (
      <View style={{flex : 1}}>
        <CustomeHeader title={'Message Box'} />
        <View style={{flex :1}}>
          <ScrollView>
          </ScrollView>
        </View>
        <View style={{height : 100 , flexDirection : 'row'}}>
            <View style={{flex: 0.75 , justifyContent :'flex-end'}}>
              <Item  rounded>
                <Input placeholder='Rounded Textbox'/>
              </Item>
            </View>
          <View style={{flex: 0.25 , justifyContent :'flex-end'}}>
            <CustomeButton title="Send" style={[styles.sendBtn , styles.sendBtnText]} />
          </View>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}

}
const mapStateToProps = (state) => {
  console.log('mapStateToProps', state.authReducer);

  return {
      // userObj: state.authReducer.user,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MessageBox) 



const styles = StyleSheet.create({
 sendBtn: {
      borderColor: '#0984e3',
      borderWidth: 2,
      backgroundColor: '#0984e3',
      borderRadius: 10,
      width: 70,
      alignItems : 'center'
    },
    sendBtnText: {
      padding: 9,
      color: '#fff',
      fontSize: 15
  }

});