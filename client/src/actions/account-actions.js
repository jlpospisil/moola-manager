import * as AccountActionTypes from './account-action-types';
import Axios from 'axios';

const url = (accountId) => {
    let url = '/api/accounts';
    if (accountId) {
        url += `/${accountId}`;
    }

    return url;
};

export const list = (accounts) => {
    return {
        type: AccountActionTypes.LIST,
        accounts
    };
};

export const get = (account) => {
    return {
        type: AccountActionTypes.GET,
        account
    }
};

export const listAccounts = () => {
    return (dispatch) => {
        return Axios.get(url())
            .then((response) => {
                dispatch(list(response.data));
            })
            .catch((error) => {
                console.error('Error retrieving accounts', error);
            });
    };
};

export const getAccount = (accountId) => {
    return (dispatch) => {
        return Axios.get(url(accountId))
            .then((response) => {
                dispatch(get(response.data));
            })
            .catch((error) => {
                console.error('Error retrieving account with id=' + accountId, error);
            });
    };
};