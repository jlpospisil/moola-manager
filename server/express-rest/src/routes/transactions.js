const express = require('express');
let router = express.Router();
const TransactionModel = require(`../database/models/transaction`);
const AccountModel = require(`../database/models/account`);

// Get all transactions
router.get('/', (req, res, next) => {
    TransactionModel.find({}, '-__v', (error, transactions) => {
        if (error) {
            next(error);
        }
        else {
            res.send(transactions);
        }

    }).sort({ _id: -1 });
});

// Get a specific transaction
router.get('/:id', (req, res, next) => {
    TransactionModel.findById(req.params.id, '-__v', (error, transaction) => {
        if (error) {
            next(error);
        }
        else if (transaction) {
            res.send(transaction);
        }
        else {
            res.status(403).send();
        }
    });
});

// Add a new transaction
router.post('/', (req, res, next) => {
    if (req.body._account) {
        AccountModel.findById(req.body._account, 'transactions', (error, account) => {
            if (error) {
                next(error);
            }
            else if (account) {

            }
            else {

            }
        });
    }
    else {
        new TransactionModel(req.body).save((error, transaction) =>  {
            if (error) {
                next(error);
            }
            else {
                if (account_document) {
                    account_document.transactions.push(transaction._id);
                }

                res.send({ success: true, transaction });
            }
        });
    }
});

// Update a specific transaction
router.put('/:id', (req, res, next) => {
    TransactionModel.findById(req.params.id, function (error, transaction) {
        delete req.body._id;

        // update the record
        Object.assign(transaction, req.body);

        // save the record
        transaction.save((error) => {
            if (error) {
                next(error);
            }
            else {
                res.send({ success: true });
            }
        });
    });
});

// Delete a specific transaction
router.delete('/:id', (req, res, next) => {
    TransactionModel.remove({
        _id: req.params.id

    }, (error) => {
        if (error) {
            next(error);
        }
        else {
            res.send({ success: true });
        }
    });
});

module.exports = router;