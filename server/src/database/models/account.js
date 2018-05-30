const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const Schema = new mongooseSchema({
    name: { type: String, required: true },
    transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'transactions'}]
}, {
    id: false,  // don't add _id getter
    toObject : { getters: true, setters: true },
    toJSON : { getters: true, setters: true }
});

const Model = mongoose.model("accounts", Schema);

module.exports = Model;