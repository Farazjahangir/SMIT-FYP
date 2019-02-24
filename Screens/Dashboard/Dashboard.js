import React from 'react';
import { StyleSheet,Button , ScrollView, FlatList, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
class Dashboard extends React.Component {   
    constructor(){
        super()
        this.state = {
            showSideBar : false,
        }
    }

    static navigationOptions = {
        title: 'Dashboard',
      };
    
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