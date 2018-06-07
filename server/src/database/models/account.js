const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const Schema = new mongooseSchema({
    name: { type: String, required: true },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transactions' }]
}, {
    id: false,  // don't add _id getter
    toObject : { virtuals: true },
    toJSON : { virtuals: true }
});

const populateTransactions = function (next) {
    this.populate('transactions');
    next();
};

// Query hooks
Schema.pre('findOne', populateTransactions).pre('find', populateTransactions);

// Virtual properties
Schema.virtual('balance').get(function () {
    if (!Array.isArray(this.transactions)) {
        return null;
    }
    const sum = this.transactions.reduce((total, transaction) => {
        if (transaction.type === "Expense") {
            return total - (100 * Number(transaction.amount));
        }
        else {
            return total + (100 * Number(transaction.amount));
        }
    }, 0);
    return (sum / 100).toFixed(2);
});

// Schema.virtual('transactions', {
//     ref: 'transactions',
//     localField: '_id',
//     foreignField: '_account',
//     justOne: false
// });

const Model = mongoose.model("accounts", Schema);

module.exports = Model;