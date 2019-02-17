import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../../Screens/Login/Login'
import HomeScreen from '../../Screens/HomeScreen/HomeScreen'
const AppNavigator = createStackNavigator({
    Login: {
      screen: Login
    },
    HomeScreen: {
        screen: HomeScreen
      }  
  });
  
  export default createAppContainer(AppNavigator);