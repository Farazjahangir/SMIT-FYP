import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import { firebase } from '../../Config/Firebase/Firebase'
class Inbox extends Component {
    constructor() {
        super()
        this.state = {
            userObj: '',
            inboxArr : []
        }
    }

    componentDidMount() {
        const { inboxArr } = this.state
        if (this.props.userObj) {
            const userUid = this.props.userObj.userUid
            const db = firebase.firestore()
            db.collection("rooms").where("userObject." + userUid, "==", true)
                .onSnapshot((querySnapshot) => {
                    if (querySnapshot.empty) {
                        console.log('querySnapshot.empty' , querySnapshot.empty);
                    }
                    querySnapshot.docChanges().forEach(async (value) => {
                        console.log('ForEach' , value.doc.data());
                        
                        console.log(value.doc.data());
                        let otherUserUid;

                        // Deciding current and other user uid
                        value.doc.data().userInfo.forEach((user) => {
                            if (user !== userUid) {
                                otherUserUid = user;
                            }
                        })
                        await db.collection('users').doc(otherUserUid).get()
                            .then((snapshot) => {
                                contactedUser = snapshot.id;
                                userName = snapshot.data().userName
                                let inboxObj = {
                                    userName,
                                    contactedUser
                                }
                                inboxArr.push(inboxObj)
                               this.setState({inboxArr})
                                

                            })

                    })
                })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.userObj) {

        }
    }

    chat(sellerUid){
        this.props.navigation.push('MessageBox' , {sellerUid} )
    }
    render() {
        const { inboxArr } = this.state
        
        return (
            <View>
                <CustomHeader title={'Inbox'} />
                <ScrollView vertical={true}>
                <List>
                {inboxArr.map((val)=>{
               return <ListItem style={{marginTop : 20}}>
                        <Left>
                            <Text>{val.userName}</Text>
                        </Left>
                        <Right>
                            <TouchableOpacity onPress={()=>{this.chat(`${val.contactedUser}`)}}>
                                <Icon name="arrow-forward" style={{fontSize : 20}} />
                            </TouchableOpacity>
                        </Right>
                        </ListItem>            
                })}
                </List>
                </ScrollView>
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
        userObj: state.authReducer.user
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Inbox)
