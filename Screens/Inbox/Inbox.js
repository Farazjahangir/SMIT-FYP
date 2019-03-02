import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { List, ListItem, Text, Left, Right, Icon, Spinner } from 'native-base';
import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import { firebase } from '../../Config/Firebase/Firebase'
class Inbox extends Component {
    constructor() {
        super()
        this.state = {
            userObj: '',
            inboxArr: [],
            isLoading: true
        }
    }

    componentDidMount() {
        if (this.props.userObj) {
            this.fetchingRooms()
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.userObj) {
            this.fetchingRooms()
        }
    }
    fetchingRooms = () => {
        const { inboxArr } = this.state
        const userUid = this.props.userObj.userUid
        // Getting Rooms From DB
        const db = firebase.firestore()
        db.collection("rooms").where("userObject." + userUid, "==", true)
            .onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach(async (value) => {
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
                            this.setState({ inboxArr, isLoading: false })
                        })

                })
            })
    }


    chat(sellerUid) {
        this.props.navigation.push('MessageBox', { sellerUid })
    }
    render() {
        const { inboxArr, isLoading } = this.state

        return (
            <View>
                <CustomHeader title={'Inbox'} />
                {isLoading && <Spinner color="blue" style={{ marginTop: 20 }} />}
                <ScrollView vertical={true} >
                    <List>
                        {!isLoading && inboxArr.map((val, i) => {
                            return <ListItem style={{ marginTop: 20 }} key={i}>
                                <Left>
                                    <Text>{val.userName}</Text>
                                </Left>
                                <Right>
                                    <TouchableOpacity onPress={() => { this.chat(`${val.contactedUser}`) }}>
                                        <Icon name="arrow-forward" style={{ fontSize: 20 }} />
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
