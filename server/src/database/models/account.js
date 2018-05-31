const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const Schema = new mongooseSchema({
    name: { type: String, required: true }
}, {
    id: false,  // don't add _id getter
    toObject : { getters: true, setters: true },
    toJSON : { getters: true, setters: true }
});

const Model = mongoose.model("accounts", Schema);

module.exports = Model;