import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo'
import AppNavigator from './Config/Routes/Routes'
import store from './redux/store'
import { Provider } from 'react-redux'
export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      fontLoad : false
    }
  }
  async componentDidMount() {
    try{
      await Font.loadAsync({
        'FredokaOne-Regular': require('./assets/fonts/FredokaOne/FredokaOne-Regular.ttf')
      });
      this.setState({fontLoad : true})
    }
    catch(e){
      console.log(e);
      
    }
  }
  render() {
    const { fontLoad } = this.state
    return (
      fontLoad && 
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
