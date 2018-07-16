import { theme } from '../../reducers/ui-reducer';
import Accounts from "../accounts/Accounts";
import Calendar from "../transactions/Calendar";
import Categories from "../categories/Categories";
import Home from "./Home";
import NavigationIcon from "./NavigationIcon";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

const routes = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: NavigationIcon("home")
        }
    },
    Categories: {
        screen: Categories,
        navigationOptions: {
            title: 'Categories',
            tabBarIcon: NavigationIcon("folder")
        }
    },
    Accounts: {
        screen: Accounts,
        navigationOptions: {
            title: 'Accounts',
            tabBarIcon: NavigationIcon("credit-card")
        }
    },
    Calendar: {
        screen: Calendar,
        navigationOptions: {
            title: 'Calendar',
            tabBarIcon: NavigationIcon("event")
        }
    }
};

const navigatorConfig = {
    initialRouteName: 'Home',
    headerMode: "float",
    // labeled: false,
    shifting: false,
    activeTintColor: theme.primaryColor,
    // inactiveTintColor: 'red',
    barStyle: {
        backgroundColor: '#ffffff'
    }
};

const Navigation = createMaterialBottomTabNavigator(routes, navigatorConfig);

export default Navigation;