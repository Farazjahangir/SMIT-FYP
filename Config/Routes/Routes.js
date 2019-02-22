import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../../Screens/Login/Login'
import SavingProfile from '../../Screens/SavingProfile/SavingProfile'
import Dashboard from '../../Screens/Dashboard/Dashboard'
import SubmitSkills from '../../Screens/SubmitSkills/SubmitSkills'
const AppNavigator = createStackNavigator({
    // Login: {
    //     screen: Login
    // },
    // SavingProfile: {
    //     screen: SavingProfile
    // },
    // Dashboard : {
    //     screen : Dashboard
    // },
    SubmitSkills : {
        screen : SubmitSkills
    }
});

export default createAppContainer(AppNavigator);