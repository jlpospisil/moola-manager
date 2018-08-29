import React from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HeaderSaveButton from './HeaderSaveButton';
import Accounts from '../accounts/Accounts';
import AddEditAccount from '../accounts/AddEditAccount';
import Transactions from '../transactions/Transactions';
import AddEditTransaction from '../transactions/AddEditTransaction';
import Calendar from '../transactions/Calendar';
import Categories from '../categories/Categories';
import NewCategory from '../categories/NewCategory';
import Home from './Home';
import NavigationIcon from './NavigationIcon';

const commonComponents = {
  NewTransaction: {
    screen: AddEditTransaction,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'New Transaction',
      headerRight: HeaderSaveButton({
        onPress: () => { Alert.alert('save', 'save new transaction here') }
      })
    })
  }
};

const createStack = (item) => {
  return createStackNavigator({
    ...item,
    ...commonComponents
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#43a047'
      }
    }
  });
};

const routes = {
  Home: {
    screen: createStack({
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          headerTitle: 'Home'
        })
      }
    }),
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: NavigationIcon('home')
    }
  },
  Categories: {
    screen: createStack({
      Categories: {
        screen: Categories,
        navigationOptions: ({ navigation }) => ({
          headerTitle: 'Categories'
        })
      },
      NewCategory: {
        screen: NewCategory,
        navigationOptions: ({ navigation }) => ({
          headerTitle: 'New Category'
        })
      }
    }),
    navigationOptions: {
      tabBarLabel: 'Categories',
      tabBarIcon: NavigationIcon('folder')
    }
  },
  Accounts: {
    screen: createStack({
      Accounts: {
        screen: Accounts,
        navigationOptions: ({ navigation }) => ({
          headerTitle: 'Accounts'
        })
      },
      NewAccount: {
        screen: AddEditAccount,
        navigationOptions: ({ navigation }) => ({
          headerTitle: 'New Account',
          headerRight: HeaderSaveButton({
            onPress: () => { navigation.state.params.saveNewAccount(); }
          })
        })
      },
      EditAccount: {
        screen: AddEditAccount,
        navigationOptions: ({ navigation }) => ({
          headerTitle: 'Edit Account',
          headerRight: HeaderSaveButton({
            onPress: () => { navigation.state.params.updateAccount(); }
          })
        })
      },
      AccountTransactions: {
        screen: Transactions,
        navigationOptions: ({ navigation }) => ({
          headerTitle: `${navigation.state.params.title}` || 'Transactions'
        })
      }
    }),
    navigationOptions: {
      tabBarLabel: 'Accounts',
      tabBarIcon: NavigationIcon('credit-card')
    }
  },
  Calendar: {
    screen: createStack({
      Calendar: {
        screen: Calendar,
        navigationOptions: ({ navigation }) => ({
          headerTitle: 'Calendar'
        })
      }
    }),
    navigationOptions: {
      tabBarLabel: 'Calendar',
      tabBarIcon: NavigationIcon('event')
    }
  }
};

const navigatorConfig = {
  initialRouteName: 'Home',
  // labeled: false,
  shifting: false,
  activeTintColor: '#43a047',
  // inactiveTintColor: 'red',
  barStyle: {
    backgroundColor: '#ffffff'
  }
};

const Navigation = createMaterialBottomTabNavigator(routes, navigatorConfig);

export default Navigation;
