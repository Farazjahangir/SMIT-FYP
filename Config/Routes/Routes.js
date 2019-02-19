import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../../Screens/Login/Login'
import SavingProfile from '../../Screens/SavingProfile/SavingProfile'
const AppNavigator = createStackNavigator({
    Login: {
      screen: Login
    },
    SavingProfile: {
        screen: SavingProfile
      }  
  });
  
  export default createAppContainer(AppNavigator);