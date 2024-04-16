const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: false
    }

}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;