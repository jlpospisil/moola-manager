const express = require('express');
let router = express.Router();
const AccountModel = require(`../database/models/account`);
const TransactionModel = require(`../database/models/transaction`);

// Get all accounts
router.get('/', (req, res, next) => {
    AccountModel.find({}, '-__v', (error, records) => {
        if (error) {
            next(error);
        }
        else {
            console.log(typeof records);
            res.send(records);
        }

    }).sort({ _id: -1 });
});

// Get a specific account
router.get('/:id', (req, res, next) => {
    AccountModel.findOne({ _id: req.params.id }, '-__v', (error, record) => {
        if (error) {
            next(error);
        }
        else if (record) {
            res.send(record);
        }
        else {
            res.status(403).send();
        }
    });
});

// Add a new account
router.post('/', (req, res, next) => {
    new AccountModel(req.body).save((error, account) =>  {
        if (error) {
            next(error);
        }
        else {
            res.send({ success: true, account });
        }
    });
});

// Update a specific account
router.put('/:id', (req, res, next) => {
    AccountModel.findById(req.params.id, function (error, record) {
        delete req.body._id;

        // update the record
        Object.assign(record, req.body);

        // save the record
        record.save((error) => {
            if (error) {
                next(error);
            }
            else {
                res.send({ success: true });
            }
        });
    });
});

// Delete an account
router.delete('/:id', (req, res, next) => {
    // TODO: delete all associated transactions before deleting account

    AccountModel.remove({
        _id: req.params.id

    }, (error) => {
        if (error){
            next(error);
        }
        else {
            res.send({ success: true });
        }
    });
});

// Get transactions for a specific account
router.get('/:id/transactions', (req, res, next) => {
    AccountModel.findOne({ _id: req.params.id }, '-__v', (error, account) => {
        if (error) {
            next(error);
        }
        else if (account) {
            res.send(account.transactions || []);
        }
        else {
            res.status(403).send();
        }
    });
});

// Add a new transaction to a specific account
router.post('/:id/transactions', (req, res, next) => {
    // Get account
    AccountModel.findById(req.params.id, 'transactions', (error, account) => {
        if (error) {
            next(error);
        }
        else if (account) {
            // Create transaction
            new TransactionModel(req.body).save((error, transaction) =>  {
                if (error) {
                    next(error);
                }
                else {
                    // Add transaction to account
                    account.transactions.push(transaction._id);
                    account.save();
                    res.send({ success: true, transaction });
                }
            });
        }
        else {
            res.status(403).send();
        }
    });
});

module.exports = router;