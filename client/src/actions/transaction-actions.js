import * as TransactionActionTypes from './transaction-action-types';
import Axios from 'axios';

const url = (transactionId) => {
    let url = '/api/transactions';

    if (transactionId) {
        url += `/${transactionId}`;
    }

    return url;
};

const setTransactions = (transactions) => {
    return {
        type: TransactionActionTypes.GET_TRANSACTIONS,
        transactions
    };
};

const setTransaction = (transaction) => {
    return {
        type: TransactionActionTypes.GET_TRANSACTION,
        transaction
    };
};

export const getTransactions = () => {
    return (dispatch) => {
        return Axios.get(url())
            .then((response) => {
                dispatch(setTransactions(response.data));
            })
            .catch((error) => {
                console.error('Error retrieving transactions', error);
            });
    };
};

export const getTransaction = (transactionId) => {
    return (dispatch) => {
        return Axios.get(url(transactionId))
            .then((response) => {
                dispatch(setTransaction(response.data));
            })
            .catch((error) => {
                console.error('Error retrieving transaction with id=' + transactionId, error);
            });
    };
};

export const createTransaction = (transaction) => {
    return (dispatch) => {
        return Axios.post(url(), {...transaction})
            .then((response) => {
                dispatch(setTransaction(response.data));
            })
            .catch((error) => {
                console.error('Error saving new transaction', { transaction, error });
            });
    };
};

export const updateTransaction = (transaction) => {
    return (dispatch) => {
        return Axios.put(url(transaction._id), {...transaction})
            .then((response) => {
                dispatch(setTransaction(response.data));
            })
            .catch((error) => {
                console.error('Error updating existing transaction', { transaction, error });
            });
    };
};

export const deleteTransaction = (transactionId) => {
    return (dispatch) => {
        return Axios.delete(url(transactionId))
            .then((response) => {
                dispatch(setTransaction(response.data));
            })
            .catch((error) => {
                console.error(`Error deleting transaction with id=${transactionId}`, error);
            });
    };
};