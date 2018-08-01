import { combineReducers } from 'redux';
import settings from './settings-reducer';
import accounts from './account-reducer';

const rootReducer = combineReducers({
    settings,
    accounts
});

export default rootReducer;