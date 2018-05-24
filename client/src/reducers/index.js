import { combineReducers } from 'redux';
import accounts from './account-reducer';

const rootReducer = combineReducers({
    accounts
});

export default rootReducer;
