import * as UiActionTypes from '../actions/ui-action-types';

let initialState = {
    theme: {
        palette: {
            primaryColor: '#607d8b',
            // accentColor: ''
        },
        toolbar: {
            container: {
                paddingTop: 25,
                height: 75
            },
        },
    },
    active: 'calendar',
    icons: {
        account: 'credit-card',
        category: 'folder',
        calendar: 'event'
    },
    navigation: {
        bottom: [
            { key: 'category', label: 'Categories', path: '/categories' },
            { key: 'account', label: 'Accounts', path: '/accounts' },
            { key: 'calendar', label: 'Calendar', path: '/calendar' }
        ]
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UiActionTypes.CHANGE_ACTIVE_ITEM:
            return {
                ...state,
                active: action.item
            };

        default:
            return state;
    }
};
