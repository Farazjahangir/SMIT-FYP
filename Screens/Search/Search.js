import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Header, Item , Icon,ListItem, Text, Radio, Right, Left } from 'native-base'

import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'

export default class Search extends Component {
    constructor(){
        super()

        this.state = {
            radioSelected : false
        }
    }

    selectRadio(){
        const { radioSelected } = this.state
        
        this.setState({radioSelected : !radioSelected})
    }
  render() {
      const { radioSelected } = this.state
    return (
      <View>
          <CustomHeader title="Search" />
          <ListItem style={{marginTop : 15}}>
            <Left>
              <Text>Search Under 10 Km</Text>
            </Left>
            <Right>
              <Radio selected={radioSelected} onPress={()=>{this.selectRadio()}} />
            </Right>
          </ListItem>
            <Input  searchBar rounded style={{marginTop : 25}}  onChangeText={(Text)=>{console.log(Text);
            }}  />
            <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
            </Item>
            <CustomButton title="Search" style={[styles.searchBtn , styles.searchBtnText]} />
          </View>
    )
  }
}


const styles = StyleSheet.create({
    searchBtn: {
      marginTop : 15,
      borderWidth: 2,
      borderColor: '#6ab04c',
      borderRadius: 10,
      backgroundColor: '#6ab04c',
      width: 120,
      padding: 10,
      alignItems: 'center',
      textAlign : 'center'
    },
    searchBtnText: {
      color: '#fff',
      fontSize: 18,
    }
  });
  
