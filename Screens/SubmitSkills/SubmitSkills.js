import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Form, Item, Input, Label, Picker, Textarea, Spinner  } from 'native-base';
import { ImagePicker  } from 'expo';
import CustomButton from '../../Components/CustomButton/CustomButton'
import { saveUserSkill } from '../../Config/Firebase/Firebase'
import { firebase } from '../../Config/Firebase/Firebase'
import { makeBlobFromURI } from '../../helper'
import CustomHeader from '../../Components/CustomHeader/CustomHeader'

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
            list : false,
            isLoading : false,
            error : false
        }
    }

    componentDidMount() {
        let categoriesList;

        // Geeting Cateogries From DB
        const db = firebase.firestore()
        db.collection("categories")
        .onSnapshot((snapshot)=> {
            snapshot.docChanges().forEach((change)=> {
                if (change.type === "added") {
                     categoriesList = change.doc.data()                     
                }
                if (change.type === "modified") {
                     categoriesList = change.doc.data()
                }
                if (change.type === "removed") {
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
        if (!result.cancelled) {
          this.setState({picUrl : result.uri})
        }
      };    

    async submitSkill() {
        this.setState({isLoading : true})
        const { rate, description, selectedCateogory } = this.state
        let { picUrl } = this.state

        if(!rate || !description || !selectedCateogory || !picUrl){
            this.setState({error : true , isLoading : false})
            return
        }
        this.setState({error : false})
        if(!picUrl.startsWith('http')){
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
        this.setState({isLoading : false})
        this.props.navigation.push("Dashboard")
        
    }
    render() {
        const { selectedCateogory, cateogriesList, list, picUrl, isLoading, error } = this.state
        return (
            <View>
            <CustomHeader title={'Submit Skill'} />
            <ScrollView vertical={true} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Image
                    source={picUrl ?{uri :  picUrl} : require('../../images/download.png')}
                    style={styles.skillImg}
                />
                <CustomButton 
                    title={'Upload Picture'}
                    style={[styles.picUploadBtn , styles.picUploadBtnText]}
                    onPress = {()=>{this.pickImage()}}
                />
                <Form>
                    <Item picker  style={{ width: '80%' }}>
                        <Picker
                            mode="dropdown"
                            selectedValue={selectedCateogory}
                            onValueChange={(value)=>{this.setState({selectedCateogory : value})}}
                        >
                        {list ?  cateogriesList.map((val , i)=>{
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
                            multiline = {true}
                            onChange = {(e)=>{this.setState({description : e.nativeEvent.text})}}
                        />
                </Form>

                <CustomButton 
                    title={'Submit'}
                    style={[styles.submitBtn , styles.submitBtnText]}
                    onPress = {()=>{this.submitSkill()}}
                />
                {isLoading && <Spinner color='blue' style={{marginTop : 25}} />}
                {error && <Text style={{color : 'red' , fontSize : 20 , marginBottom : 30}}>All Fields Are Required</Text>}
            </View>
            </ScrollView>
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
    skillImg : {
        width : 180,
        height : 180,
        marginTop : 30,
    },
    picUploadBtn : {
        backgroundColor : '#0984e3',
        borderWidth : 2,
        borderColor : '#0984e3',
        borderRadius : 10,
        marginTop : 10
    },
    picUploadBtnText : {
        color : '#fff',
        padding : 7,
        fontSize : 14
    },
    submitBtn : {
        backgroundColor : '#0984e3',
        borderWidth : 2,
        borderColor : '#0984e3',
        borderRadius : 10,
        marginTop : 10,
        marginBottom : 100,
        width : 150,
        alignItems : 'center'
    },
    submitBtnText : {
        padding : 7,
        color : '#fff',
        fontSize : 14
    }
});

