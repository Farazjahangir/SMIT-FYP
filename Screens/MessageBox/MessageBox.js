import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Item, Input, List, ListItem, Body, Text, Spinner } from 'native-base';
import CustomeButton from '../../Components/CustomButton/CustomButton'
import CustomeHeader from '../../Components/CustomHeader/CustomHeader'

import { firebase } from '../../Config/Firebase/Firebase'
class MessageBox extends Component {
  constructor(){
    super()
    this.state = {
      roomId : '',
      message: '',
      messageArr : [],
      userObj : '',
      isLoading : true
    }
  }

  componentDidMount(){
    if(this.props.userObj){
        this.setState({userObj : this.props.userObj})
    }
    const { messageArr } = this.state
    const db = firebase.firestore()
    let roomId;
    const userUid = this.props.userObj.userUid
    const sellerUid =this.props.navigation.state.params.sellerUid
    const userObject = {
      [userUid] : true,
      [sellerUid] : true,
      createdAt : Date.now()
    }
    const userInfo = [userUid , sellerUid]
    db.collection("rooms")
    .where("userObject." + userUid, "==", true)
    .where("userObject." + sellerUid, "==", true)
    .onSnapshot(querySnapshot => {
      if (querySnapshot.empty) {
        console.log('querySnapshot.empty' , querySnapshot.empty);
        
        db.collection("rooms")
          .add({ userObject , userInfo })
          .then(doc => {
            roomId = doc.id;
            this.setState({roomId : roomId , isLoading : false})
            return false;
          });
      }
      querySnapshot.docChanges().forEach(value => {
        db.collection("rooms")
          .doc(value.doc.id)
          .collection("messages")
          .orderBy("createdAt")
          .onSnapshot(querySnapshot => {
            if(querySnapshot.empty){
              console.log('querySnapshot.empty_Messages' , querySnapshot.empty);
            }
            roomId = value.doc.id;
            this.setState({roomId : roomId})
            querySnapshot.docChanges().forEach(value => {
              var senderId  = value.doc.data().senderUid;
              messageArr.push(value.doc.data())
              this.setState({messageArr , senderId , isLoading : false})
              
            });
          });
      });
    });   
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.userObj){
        this.setState({userObj : nextProps.userObj})
    }
  }
  sendMsg(){
    const db = firebase.firestore()
    const { roomId , message } = this.state
    console.log('RoomId' , roomId);
    
    const msgObj = {
      senderName : this.props.userObj.userName,
      message,
      senderUid : this.props.userObj.userUid,
      sellerUid : this.props.navigation.state.params.sellerUid,
      createdAt : Date.now()
    }
    db.collection("rooms")
    .doc(roomId)
    .collection("messages")
    .add(msgObj);
}

  render() {
     const { messageArr, isLoading } = this.state
    const { userUid } = this.props.userObj
    console.log('message' , this.props);
    
      
    return (
      <View style={{flex : 1}}>
        <CustomeHeader title={'Message Box'} />
        {isLoading && <Spinner color ='blue' style={{marginTop : 20}} />}
        <View style={{flex :1}}>
          <ScrollView>
              {messageArr.map((val , i)=>{
                return <List key = {i}>
                <ListItem avatar>
                  {val.senderUid === userUid
                    ?
                    <Body>
                    <Text>{val.message}</Text>
                  </Body>
                  :
                  <Body style={{flex:1  , alignItems: 'flex-end'}}>
                    <Text>{val.message}</Text>
                  </Body>
                  }
                  </ListItem>
                  </List>
                  })
                  }
          </ScrollView>
        </View>
        <View style={{height : 100 , flexDirection : 'row'}}>
            <View style={{flex: 0.75 , justifyContent :'flex-end'}}>
              <Item  rounded>
                <Input placeholder='Rounded Textbox' onChangeText={(text)=>{this.setState({message : text})}} />
              </Item>
            </View>
          <View style={{flex: 0.25 , justifyContent :'flex-end'}}>
            <CustomeButton title="Send" style={[styles.sendBtn , styles.sendBtnText]} onPress={()=>{this.sendMsg()}} />
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
      userObj: state.authReducer.user,
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