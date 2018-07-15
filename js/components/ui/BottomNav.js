import { theme } from '../../reducers/ui-reducer';
import Accounts from "../accounts/Accounts";
import Calendar from "../transactions/Calendar";
import Categories from "../categories/Categories";
import Home from "./Home";
import BottomNavIcon from "./BottomNavIcon";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

const routes = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: BottomNavIcon("home")
        }
    },
    Categories: {
        screen: Categories,
        navigationOptions: {
            title: 'Categories',
            tabBarIcon: BottomNavIcon("folder")
        }
    },
    Accounts: {
        screen: Accounts,
        navigationOptions: {
            title: 'Accounts',
            tabBarIcon: BottomNavIcon("credit-card")
        }
    },
    Calendar: {
        screen: Calendar,
        navigationOptions: {
            title: 'Calendar',
            tabBarIcon: BottomNavIcon("event")
        }
    }
};

const navigatorConfig = {
    initialRouteName: 'Home',
    // labeled: false,
    shifting: false,
    activeTintColor: theme.primaryColor,
    // inactiveTintColor: 'red',
    barStyle: {
        backgroundColor: '#ffffff'
    }
};

const BottomNav = createMaterialBottomTabNavigator(routes, navigatorConfig);

export default BottomNav;