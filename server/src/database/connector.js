const mongoose = require('mongoose');

// Connection details
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const schema = process.env.DB_SCHEMA || 'test';

// Create connection
mongoose.connect(`mongodb://${host}:${port}/${schema}`);

const db = mongoose.connection;

db.once("open", () => {
    // console.log("Connection Succeeded");
})
.on("error", console.error.bind(console, "connection error"));

module.exports = db;