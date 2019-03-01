import React from 'react';
import { connect } from 'react-redux'

import { StyleSheet, ScrollView, FlatList, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Spinner } from 'native-base';
import Button  from '../../Components/Button/Button'
import { firebase } from '../../Config/Firebase/Firebase'
class Dashboard extends React.Component {   
    constructor(){
        super()
        this.state = {
            showSideBar : false,
            skillsArr :[],
            list : false,
            isLoading : true
        }
    }

    // static navigationOptions = {
    //     title: 'Dashboard',
    // };
   
    componentDidMount(){
        console.log('Componrnt' , this.props);
        
        let { skillsArr } = this.state
        let skillsList;
          const db = firebase.firestore()
          db.collection("Skills")
          .onSnapshot((snapshot)=> {
                  snapshot.docChanges().forEach((change)=> {
                      if (change.type === "added") {
                            skillsList = change.doc.data()
                      }
                      if (change.type === "modified") {
                          skillsList = change.doc.data()
                      }
                      if (change.type === "removed") {
                          skillsList = change.doc.data()
                      }
                      skillsArr.push(skillsList)
                      this.setState({skillsArr :skillsArr , list : true , isLoading : false})
                  });
          });  
      }

      componentWillReceiveProps(nextProps){
          console.log('componentWillReceiveProps' , nextProps);
          
      }
    
    render(){
       const { showSideBar, skillsArr, list, isLoading } = this.state
    //    console.log('State' , this.state.skillsArr);
       
        return(
            <View style={{flex : 1}}>
                {isLoading &&  <Spinner color = 'blue' style={{flex : 1 , justifyContent : 'center'}}  /> }
                <ScrollView vertical={true}  contentContainerStyle={styles.contentContainer}>
                        {list &&
                            skillsArr.map((val , i)=>{
                                return<Content key={Date.now() + i} style={{marginTop : 20}}>
                                        <List >
                                            <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{uri : val.picUrl}} />
                                            </Left>
                                            <Body>
                                                <Text>{val.SkillName}</Text>
                                                <Text note numberOfLines = {2}>{val.Description}</Text>
                                            </Body>
                                            <Right>
                                                <Button style={[styles.viewBtn , styles.viewBtnText]}>View</Button>
                                                <Text style={{marginTop : 10}}>{val.Rate}</Text>
                                            </Right>
                                            </ListItem>
                                        </List>
                                </Content>
                           
                            })
                        }
                    {/* <List>
                        <ListItem avatar>
                        <Left>
                            <Thumbnail source={require('../../images/download.png')} />
                        </Left>
                        <Body>
                            <Text>Kumar Pratik</Text>
                            <Text note numberOfLines = {2}>Doing what you like will always keep you happy. .</Text>
                        </Body>
                        <Right>
                            <Button style={[styles.viewBtn , styles.viewBtnText]}>View</Button>
                        </Right>
                        </ListItem>
          </List> */}
                </ScrollView>
            </View>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return {}

}
const mapStateToProps = (state) => {

  return {
    userName: state.authReducer.user.userName,
    profilePicUrl : state.authReducer.user.profilePic,
    userUid : state.authReducer.user.userUid
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

const styles = StyleSheet.create({
    contentContainer: {
        // flex: 1
    //   height: '100%'
    },
    viewBtn : {
        borderColor : '#0984e3',
        borderWidth : 2,
        backgroundColor : '#0984e3',
        padding : 5,
        borderRadius : 10
    },
    viewBtnText : {
        color : '#fff',
        fontSize : 13
    }
  });