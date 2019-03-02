import React from 'react'
import { connect } from 'react-redux'

import {  StyleSheet, Image , TouchableOpacity } from 'react-native'
import { Header, Icon, Button, Title, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation'
import { logoutUser } from '../../redux/Actions/authActions'

class CustomHeader extends React.Component {
    logout(){
        this.props.logoutUser()
        this.props.navigation.replace('Login')
    }      
    render(){
        return(
            <Header style={{marginTop : 25}}>
            <Left>
                <Button transparent>
                  <Icon name='arrow-back' onPress={()=>{this.props.navigation.goBack()}} />
                </Button>
            </Left>
            <Body style={{flexDirection : 'row' , justifyContent : 'center'}}>
                <Title>{this.props.title}</Title>
            </Body>
            <Right>
                <TouchableOpacity
                    onPress = {()=>{this.props.navigation.toggleDrawer()}}      
                >
                <Image 
                    source={require('../../images/menu.png')} 
                    style={{width : 60 , height : 60}} 
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {()=>{this.logout()}}      
                    style={{marginBottom : 10}}
                >
                <Image 
                    source={require('../../images/logout.png')} 
                    style={{width : 40 , height : 40}} 
                    />
                </TouchableOpacity>
            </Right>
        </Header>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      logoutUser: () => dispatch(logoutUser())
    }

}
const mapStateToProps = (state) => {

  return {}
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CustomHeader))


const styles = StyleSheet.create({
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
    }
});