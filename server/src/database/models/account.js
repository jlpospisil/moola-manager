const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const Schema = new mongooseSchema({
    name: { type: String, required: true }
});

const Model = mongoose.model("accounts", Schema);

module.exports = Model;