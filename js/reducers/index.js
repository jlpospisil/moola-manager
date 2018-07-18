import { combineReducers } from 'redux';
import ui from './ui-reducer';
import settings from './settings-reducer';
import accounts from './account-reducer';

const rootReducer = combineReducers({
    ui,
    settings,
    accounts
});

export default rootReducer;