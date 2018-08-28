import { combineReducers } from 'redux';
import accounts from './account-reducer';
import settings from './settings-reducer';
import transactions from './transaction-reducer';
import ui from './ui-reducer';

const rootReducer = combineReducers({
  accounts,
  settings,
  transactions,
  ui
});

export default rootReducer;