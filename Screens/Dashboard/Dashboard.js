import React from 'react';
import { connect } from 'react-redux'

import { StyleSheet, ScrollView, View, Modal } from 'react-native';
import { Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Spinner, Card, CardItem } from 'native-base';
import CustomButton from '../../Components/CustomButton/CustomButton'
import { firebase } from '../../Config/Firebase/Firebase'
import CustomHeader from '../../Components/CustomHeader/CustomHeader'
class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            showSideBar: false,
            skillsArr: [],
            list: false,
            isLoading: true,
            modalVisible: false,
            index: 0
        }
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        console.log('Componrnt', this.props);
        let { skillsArr } = this.state
        let skillsList;
        const db = firebase.firestore()
        db.collection("Skills")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
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
                    this.setState({ skillsArr: skillsArr, list: true, isLoading: false })
                });
            });
    }

    // getFullDetails(i){
    //     const { skillsArr } = this.state
    //     console.log('getFullDetails' , skillsArr[i]);

    // }
    contact(){
        const { skillsArr , index } = this.state
        this.setState({modalVisible : false})
        const sellerUid = skillsArr[index].userUid
        this.props.navigation.push('MessageBox' , {sellerUid})
    }

    render() {
        const { skillsArr, 
                list, 
                isLoading, 
                modalVisible, 
                index 
            } = this.state
        console.log('Detal', skillsArr[index]);

        return (
            <View style={{ flex: 1 }}>
                <CustomHeader title={'Dashboard'} />
                {isLoading && <Spinner color='blue' style={{ flex: 1, justifyContent: 'center' }} />}
                <ScrollView vertical={true} contentContainerStyle={styles.contentContainer}>
                    {list &&
                        <View>
                            <Modal
                                animationType="slide"
                                visible={modalVisible}
                                onRequestClose={() => { this.setState({ modalVisible: false }) }}
                            >
                                <ScrollView vertical={true}>
                                    <View style={{ marginTop: 40, marginLeft: 15 }}>
                                        <Text style={{fontSize : 30 , textAlign : 'center'}}>Details</Text>
                                        <Card>
                                            <CardItem header bordered>
                                                <Text>Skill</Text>
                                            </CardItem>
                                            <CardItem bordered>
                                                <Body>
                                                    <Text>{skillsArr[index].SkillName}</Text>
                                                </Body>
                                            </CardItem>
                                            <CardItem header bordered>
                                                <Text>Dexcription</Text>
                                            </CardItem>
                                            <CardItem bordered>
                                                <Body>
                                                    <Text>{skillsArr[index].Description}</Text>
                                                </Body>
                                            </CardItem>
                                            <CardItem header bordered>
                                                <Text>Charges</Text>
                                            </CardItem>
                                            <CardItem bordered>
                                                <Body>
                                                    <Text>{skillsArr[index].Rate}</Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                            <CustomButton
                                                title={'Contact'}
                                                onPress={() => {this.contact()}}
                                                style={[styles.contactBtn, styles.contactBtnText]}
                                            />
                                            <CustomButton
                                                title={'Send Proposal'}
                                                onPress={() => { this.setState({ modalVisible: false }) }}
                                                style={[styles.proposalBtn, styles.proposalBtnText]}
                                            />
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <CustomButton
                                                title={'Back'}
                                                onPress={() => { this.setState({ modalVisible: false }) }}
                                                style={[styles.modalBackBtn, styles.modalBackBtnText]}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            </Modal>
                            {skillsArr.map((val, i) => {
                                return <Content key={Date.now() + i} style={{ marginTop: 20 }}>
                                    <List >
                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: val.picUrl }} />
                                            </Left>
                                            <Body>
                                                <Text>{val.SkillName}</Text>
                                                <Text note numberOfLines={2}>{val.Description}</Text>
                                            </Body>
                                            <Right>
                                                <CustomButton
                                                    title={'View'}
                                                    style={[styles.viewBtn, styles.viewBtnText]}
                                                    onPress={() => { this.setState({ modalVisible: true, index: i }) }}
                                                />
                                            </Right>
                                        </ListItem>
                                    </List>
                                </Content>

                            })}
                        </View>
                    }
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
        // userName: state.authReducer.user.userName,
        // profilePicUrl: state.authReducer.user.profilePicUrl,
        // userUid: state.authReducer.user.userUid,
        // contactNum: state.authReducer.user.contactNum,
        // isLogin: state.authReducer.user.isLogin
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

const styles = StyleSheet.create({
    contentContainer: {
        // flex: 1
        //   height: '100%'
    },
    viewBtn: {
        borderColor: '#0984e3',
        borderWidth: 2,
        backgroundColor: '#0984e3',
        padding: 5,
        borderRadius: 10
    },
    viewBtnText: {
        color: '#fff',
        fontSize: 13
    },
    modalBackBtn: {
        borderColor: '#0984e3',
        borderWidth: 2,
        backgroundColor: '#0984e3',
        padding: 5,
        borderRadius: 20,
        marginTop: 30,
        width: 200,
        alignItems: 'center',
        marginBottom : 20
    },
    modalBackBtnText: {
        color: '#fff',
        fontSize: 17
    },
    contactBtn: {
        borderColor: '#0984e3',
        borderWidth: 2,
        backgroundColor: '#0984e3',
        padding: 5,
        borderRadius: 10,
        width: 110,
        alignItems: 'center'
    },
    contactBtnText: {
        color: '#fff',
        fontSize: 16
    },
    proposalBtn: {
        borderColor: '#0984e3',
        borderWidth: 2,
        backgroundColor: '#0984e3',
        padding: 5,
        borderRadius: 10,
        marginLeft: 20,
        width: 150,
        alignItems: 'center'
    },
    proposalBtnText: {
        color: '#fff',
        fontSize: 16
    }

});