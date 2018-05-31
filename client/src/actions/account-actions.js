import * as AccountActionTypes from './account-action-types';
import Axios from 'axios';

const url = (accountId, endpoint) => {
    let url = '/api/accounts';

    if (accountId) {
        url += `/${accountId}`;
    }

    if (endpoint) {
        url += `/${endpoint}`;
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

export const listTransactions = (transactions) => {
    return {
        type: AccountActionTypes.LIST_ACCOUNT_TRANSACTIONS,
        transactions
    }
};

export const getAccounts = () => {
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

export const createAccount = (account) => {
    return (dispatch) => {
        return Axios.post(url(), {...account})
            .then((response) => {
                dispatch(get(response.data));
            })
            .catch((error) => {
                console.error('Error saving new account', { account, error });
            });
    };
};

export const updateAccount = (account) => {
    return (dispatch) => {
        return Axios.put(url(account._id), {...account})
            .then((response) => {
                dispatch(get(response.data));
            })
            .catch((error) => {
                console.error('Error saving new account', { account, error });
            });
    };
};

export const deleteAccount = (accountId) => {
    return (dispatch) => {
        return Axios.delete(url(accountId))
            .then((response) => {
                dispatch(get(response.data));
            })
            .catch((error) => {
                console.error(`Error deleting account with id=${accountId}`, error);
            });
    };
};

export const getAccountTransactions = (accountId) => {
    return (dispatch) => {
        return Axios.get(url(accountId, 'transactions'))
            .then((response) => {
                dispatch(listTransactions(response.data))
            })
            .catch((error) => {
                console.error(`Error retrieving account transactions for account with id=${accountId}`, error);
            });
    }
};