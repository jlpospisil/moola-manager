const express = require('express');
let router = express.Router();
const Model = require(`../database/models/account`);

// Route to get all records
router.get('/', (req, res) => {
    Model.find({}, '-__v', (error, records) => {
        if (error) console.error(error);

        res.send(records);

    }).sort({ _id: -1 });
});

// Route to get specific record
router.get('/:id', (req, res) => {
    Model.findById(req.params.id, '-__v', (error, record) => {
        if (error) console.error(error);

        res.send(record)
    });
});

// Route to add new record
router.post('/', (req, res, next) => {
    new Model(req.body).save((error) =>  {
        if (error) res.send(error);

        res.send({ success: true });
    });
});

// Update a specific record
router.put('/:id', (req, res) => {
    Model.findById(req.params.id, function (error, record) {
        if (error) console.error(error);

        delete req.body._id;

        // update the record
        Object.assign(record, req.body);

        // save the record
        record.save((error) => {
            if (error) console.log(error);

            res.send({ success: true })
        });
    });
});

// Delete a record
router.delete('/:id', (req, res) => {
    Model.remove({
        _id: req.params.id

    }, (error) => {
        if (error) res.send(error);

        res.send({ success: true });
    });
});

module.exports = router;