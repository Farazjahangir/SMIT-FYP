import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Textarea  } from 'native-base';
import { ImagePicker  } from 'expo';
import Button from '../../Components/Button/Button'
import { saveUserSkill , getCateogriesFromDb } from '../../Config/Firebase/Firebase'
import { firebase } from '../../Config/Firebase/Firebase'
import { makeBlobFromURI } from '../../helper'

class SubmitSkills extends Component {
    constructor() {
        super()
        this.state = {
            showSideBar: false,
            skillName: '',
            description: '',
            rate: '',
            picUrl: '',
            selectedCateogory : '',
            cateogriesList : '',
            list : false
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Dashboard",
            headerRight: (
                <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10 }} onPress={navigation.getParam('openSideMenu')}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            ),
        };
    };

    componentDidMount() {
        let categoriesList;
    // require("firebase/firestore");
        const db = firebase.firestore()
        db.collection("categories")
        .onSnapshot((snapshot)=> {
            snapshot.docChanges().forEach((change)=> {
                if (change.type === "added") {
                    console.log("New city: ", change.doc.data());
                     categoriesList = change.doc.data()
                     console.log('asas' , categoriesList.categories);
                     
                }
                if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.data());
                     categoriesList = change.doc.data()
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data());
                     categoriesList = change.doc.data()
                }
                this.setState({cateogriesList : categoriesList.categories , list : true})
            });
        });  
        
    }
    async pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 4]
        });
    
        console.log('Image', result);
        
        if (!result.cancelled) {
          this.setState({picUrl : result.uri})
        }
      };    

    // openSideMenu = () => {
    //     const showSideBar = this.state.showSideBar
    //     if (showSideBar) {
    //         this.setState({ showSideBar: false })
    //     }
    //     else {
    //         this.setState({ showSideBar: true })
    //     }

    // }

    async submitSkill() {
        const { skillName, rate, description, selectedCateogory } = this.state
        let { picUrl } = this.state
        if(!picUrl.startsWith('http')){
            console.log('IF' , picUrl);
            
            await makeBlobFromURI(picUrl).then((blob)=>{
            picUrl = blob
            })    
        }
        const userSkillObj = {
            selectedCateogory,
            rate,
            description,
            picUrl
        }
        const success = await saveUserSkill(userSkillObj)
        console.log(success , "success");
        
    }
    render() {
        console.log(this.state);
        
        const { showSideBar, selectedCateogory, cateogriesList, list, picUrl } = this.state
        return (
            <View style={styles.container}>
                <Image
                    source={picUrl ?{uri :  picUrl} : require('../../images/download.png')}
                    style={styles.skillImg}
                />
                <Button 
                style={[styles.picUploadBtn , styles.picUploadBtnText]}
                onPress = {()=>{this.pickImage()}}
                >
                    Upload Picture
                </Button>
                <Form>
                    <Item picker  style={{ width: '80%' }}>
                        <Picker
                            mode="dropdown"
                            selectedValue={selectedCateogory}
                            onValueChange={(value)=>{this.setState({selectedCateogory : value})}}
                        >
                        {list ?  cateogriesList.map((val , i)=>{
                            console.log('MAp' , val);   
                            return <Picker.Item label={val} value={val} key={Date.now() + i} />
                        })
                        :
                        <Picker.Item label="Fetching Categories..." value="Fetching Cat egories..." />
                        }
                        </Picker>
                        </Item>
                        <Item floatingLabel style={{ width: '80%' }}>
                            <Label>Rate</Label>
                            <Input onChange = {(e)=>{this.setState({rate : e.nativeEvent.text})}}/>
                        </Item>
                        <Textarea 
                            rowSpan={5} 
                            bordered 
                            placeholder="Description (max character 300)" 
                            style={{marginTop : 15}} 
                            maxLength={300} 
                            onChange = {(e)=>{this.setState({description : e.nativeEvent.text})}}
                        />
                </Form>

                <Button 
                    style={[styles.submitBtn , styles.submitBtnText]}
                    onPress = {()=>{this.submitSkill()}}>
                    Submit
                </Button>
            </View>
        )
    }
}

export default SubmitSkills

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        marginTop : 15
    },
    input: {
        width: '90%',
        borderWidth: 2,
        borderColor: '#CAD3C8',
        padding: 6,
        marginTop: 20,
        padding: 10,
        marginLeft: 10,
        marginTop: 25
    },
    head: {
        marginTop: 30,
        alignItems: 'center',
        fontSize: 20
    },
    submitBtn: {
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'blue',
        borderRadius: 10,
        marginTop: 20,
        width: 120,
        alignItems: 'center'
    },
    submitBtnText: {
        color: '#fff',
        padding: 10,
        fontSize: 19,
    },
    skillImg : {
        width : 200,
        height : 200
    },
    picUploadBtn : {
        backgroundColor : '#0984e3',
        borderWidth : 2,
        borderColor : '#0984e3',
        borderRadius : 10,
        padding : 10,
        marginTop : 10
    },
    picUploadBtnText : {
        color : '#fff',
        fontSize : 18
    },
    submitBtn : {
        backgroundColor : '#0984e3',
        borderWidth : 2,
        borderColor : '#0984e3',
        borderRadius : 10,
        padding : 10,
        marginTop : 10,
        width : 150,
        alignItems : 'center'
    },
    submitBtnText : {
        color : '#fff',
        fontSize : 18
    }
});

