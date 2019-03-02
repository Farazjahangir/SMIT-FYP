import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import Login from '../../Screens/Login/Login'
import SavingProfile from '../../Screens/SavingProfile/SavingProfile'
import Dashboard from '../../Screens/Dashboard/Dashboard'
import SubmitSkills from '../../Screens/SubmitSkills/SubmitSkills'
import MessageBox from '../../Screens/MessageBox/MessageBox'




const DrawerNavigator = createDrawerNavigator({
    Dashboard: {
        screen: Dashboard,
    },
    SubmitSkills : {
        screen : SubmitSkills
    }
});

const AppNavigator = createStackNavigator({
    // Login: {
    //     screen: Login,
    // },
    // SavingProfile: {
    //     screen: SavingProfile
    // },
    // Dashboard: {
    //     screen: DrawerNavigator,
    // },
    // SubmitSkills: {
    //     screen: SubmitSkills
    // },
    MessageBox: {
        screen: MessageBox
    }
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const Navigator = createAppContainer(AppNavigator)

export default Navigator