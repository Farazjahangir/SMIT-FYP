import React from 'react';
import { connect } from 'react-redux'

import { StyleSheet, ScrollView, View, Modal, Image } from 'react-native';
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
            index: 0,
            userUid :''
        }
    }
    componentDidMount() {
        // Checking USer Obj In Redux
        if(this.props.userObj){
            this.setState({userUid : this.props.userObj.userUid})
        }
        let { skillsArr } = this.state
        let skillsList;
        // Geeting Skillful users from DB
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

    componentWillReceiveProps(nextProps){
        if(nextProps.userObj){
            this.setState({userUid : nextProps.userObj.userUid})
        }
    }

    contact(){
        const { skillsArr , index, userUid } = this.state
        this.setState({modalVisible : false})
        const sellerUid = skillsArr[index].userUid
        this.props.navigation.push('MessageBox' , {sellerUid , userUid})
    }

    render() {
        const { skillsArr, 
                list, 
                isLoading, 
                modalVisible, 
                index 
            } = this.state

        return (
            <View style={{ flex: 1 }}>
                <CustomHeader title={'Dashboard'} />
                {/* Loader */}
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
                                        <View style={{alignItems : 'center'}}>
                                            <Image 
                                                source = {{uri : skillsArr[index].picUrl}}
                                                style={{width : 150 , height : 150 , marginTop : 30 , marginBottom : 30}}
                                            />
                                        </View>
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

                            {/* MApping On Skillful users Arr */}
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
        userObj: state.authReducer.user
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
        borderColor: '#d63031',
        borderWidth: 2,
        backgroundColor: '#d63031',
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
        borderColor: '#4cd137',
        borderWidth: 2,
        backgroundColor: '#4cd137',
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