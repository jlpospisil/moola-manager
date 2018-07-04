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
    navigation: {
        bottom: [
            { key: 'categories', label: 'Categories', icon: 'folder', path: '/categories' },
            { key: 'accounts', label: 'Accounts', icon: 'credit-card', path: '/accounts' },
            { key: 'calendar', label: 'Calendar', icon: 'event', path: '/calendar' }
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
