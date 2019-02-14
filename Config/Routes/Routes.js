import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../../Components/Login/Login'
import HomeScreen from '../../Components/HomeScreen/HomeScreen'
const AppNavigator = createStackNavigator({
    Login: {
      screen: Login
    },
    HomeScreen: {
        screen: HomeScreen
      }  
  });
  
  export default createAppContainer(AppNavigator);