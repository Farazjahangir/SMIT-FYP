import React from 'react';
import { StyleSheet,Button , ScrollView, FlatList, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import SideBar from '../../Components/SideBar/SideBar'
class Dashboard extends React.Component {   
    constructor(){
        super()
        this.state = {
            showSideBar : false,
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
       console.log("SIDE BAr" , showSideBar);
       
      }
    render(){
       const { showSideBar } = this.state
       console.log("PROPS" , this.props);
       
        
        return(
            <View>

                    {showSideBar && <SideBar />}
                    <ScrollView vertical={true}  contentContainerStyle={styles.contentContainer}>
                    <View>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>
                        <Text>Hello</Text>



                    </View>
                </ScrollView>
            </View>
        )

    }
}

export default Dashboard

const styles = StyleSheet.create({
    contentContainer: {
        // flex: 1
    //   height: '100%'
    }
  });