import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { saveUserSkill } from '../../Config/Firebase/Firebase'
class SubmitSkills extends Component {
    constructor(){
        super()
        this.state = {
            showSideBar : false,
            skillName : '',
            description : '',
            rate : ''
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle:"Dashboard",
          headerRight: (
            <TouchableOpacity style={{backgroundColor : 'blue' , padding: 10}} onPress={navigation.getParam('openSideMenu')}>
                <Text>Menu</Text>
            </TouchableOpacity>
          ),
        };
      };

      componentDidMount(){
        this.props.navigation.setParams({ openSideMenu : this.openSideMenu });
      }

      openSideMenu = ()=>{
        const showSideBar =  this.state.showSideBar
        if(showSideBar){
            this.setState({showSideBar : false})
        }
        else{
            this.setState({showSideBar : true})
        }
       
      }


    submitSkill(){
        const { skillName, rate, description } = this.state
        const userSkillObj = {
            skillName,
            rate,
            description
        }
        saveUserSkill(userSkillObj).then((result)=>{console.log(result);
        })
    }
  render() {
      const { showSideBar } = this.state
    return (
        <View style={{height : '100%'}}>
            {showSideBar && <SideBar />}
            <View style={styles.container}>
                <Text style={styles.head}>Post About Your Skill</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Your Skill Type'
                    placeholderTextColor='#535c68'
                    onChange = {(e)=>{this.setState({skillName : e.nativeEvent.text})}}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Tell Us About Your Skill (max 400 words)'
                    placeholderTextColor='#535c68'
                    multiline = {true}
                    numberOfLines = {7}
                    maxLength = {500}
                    onChange = {(e)=>{this.setState({description : e.nativeEvent.text})}}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Rate'
                    placeholderTextColor='#535c68'
                    onChange = {(e)=>{this.setState({rate : e.nativeEvent.text})}}
                />
                <TouchableOpacity 
                    style={styles.submitBtn}
                    onPress = {()=>{this.submitSkill()}}
                >
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}

export default SubmitSkills

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    input: {
      width: '90%',
      borderWidth: 2,
      borderColor: '#CAD3C8',
      padding: 6,
      marginTop: 20,
      padding: 10,
      marginLeft: 10,
      marginTop : 25
    },
    head : {
        marginTop : 30,
        alignItems : 'center',
        fontSize : 20
    },
    submitBtn : {
        borderWidth : 1,
        borderColor : 'blue',
        backgroundColor : 'blue',
        borderRadius : 10,
        marginTop : 20,
        width : 120,
        alignItems : 'center'
    },
    submitBtnText : {
        color : '#fff',
        padding : 10,
        fontSize : 19,
    }
  
  });
  
