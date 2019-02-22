import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../../Screens/Login/Login'
import SavingProfile from '../../Screens/SavingProfile/SavingProfile'
import Dashboard from '../../Screens/Dashboard/Dashboard'
const AppNavigator = createStackNavigator({
    // Login: {
    //     screen: Login
    // },
    // SavingProfile: {
    //     screen: SavingProfile
    // },
    Dashboard : {
        screen : Dashboard
    }
});

export default createAppContainer(AppNavigator);