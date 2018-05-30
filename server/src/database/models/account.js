const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const Schema = new mongooseSchema({
    name: { type: String, required: true },
    transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'transactions'}]
});

const Model = mongoose.model("accounts", Schema);

module.exports = Model;