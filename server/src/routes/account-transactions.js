const express = require('express');
let router = express.Router();
const AccountModel = require(`../database/models/account`);
const TransactionModel = require(`../database/models/transaction`);

// Get transactions for a specific account
router.get('/:id/transactions', (req, res, next) => {
    AccountModel.findById(req.params.id)
        .populate('transactions')
        .exec((error, account) => {
            if (error) {
                next(error);
            }
            else if (account) {

                res.send(account.transactions);
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
                    // Add transaction to the account
                    account.transactions.push(transaction._id);
                    account.save((error, account) => {
                        if (error) {
                            next(error);
                        }

                        res.send({ success: true, transaction });
                    });
                }
            });
        }
        else {
            res.status(403).send();
        }
    });
});

module.exports = router;