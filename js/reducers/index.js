import { combineReducers } from 'redux';
import ui from './ui-reducer';
import accounts from './account-reducer';

const rootReducer = combineReducers({
    ui,
    accounts
});

export default rootReducer;