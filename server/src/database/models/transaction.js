const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const Schema = new mongooseSchema({
    date: { type : Date, default: Date.now },
    _account: { type: mongoose.Schema.Types.ObjectId, ref: 'accounts' },
    _vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'vendors' },
    note: { type: String, required: false },
    amount: { type: Number, set: setCurrency, get: getCurrency, required: true }
}, {
    id: false,  // don't add _id getter
    toObject : { getters: true, setters: true },
    toJSON : { getters: true, setters: true }
});

const Model = mongoose.model("transactions", Schema);

// Setters and getters
function setCurrency (price) {
    price = price.toString().replace(/[^-\d.]/g, '');
    price = Number(price) * 100;

    return Math.trunc(price);
}

function getCurrency (price) {
    return (price / 100).toFixed(2);
}

module.exports = Model;
