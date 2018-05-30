const express = require('express');
let router = express.Router();
const TransactionModel = require(`../database/models/transaction`);

// Route to get all records
router.get('/', (req, res, next) => {
    TransactionModel.find({}, '-__v', (error, records) => {
        if (error) {
            next(error);
        }

        res.send(records);

    }).sort({ _id: -1 });
});

// Route to get specific record
router.get('/:id', (req, res, next) => {
    TransactionModel.findById(req.params.id, '-__v', (error, record) => {
        if (error) {
            next(error);
        }

        if (record) {
            res.send(record);
        }
        else {
            res.status(403).send();
        }
    });
});

// Route to add new record
router.post('/', (req, res, next) => {
    new TransactionModel(req.body).save((error) =>  {
        if (error) {
            next(error);
        }
        
        res.send({ success: true });
    });
});

// Update a specific record
router.put('/:id', (req, res, next) => {
    TransactionModel.findById(req.params.id, function (error, record) {
        delete req.body._id;

        // update the record
        Object.assign(record, req.body);

        // save the record
        record.save((error) => {
            if (error) {
                next(error);
            }
            
            res.send({ success: true })
        });
    });
});

// Delete a record
router.delete('/:id', (req, res, next) => {
    TransactionModel.remove({
        _id: req.params.id

    }, (error) => {
        if (error) {
            next(error);
        }
        
        res.send({ success: true });
    });
});

module.exports = router;