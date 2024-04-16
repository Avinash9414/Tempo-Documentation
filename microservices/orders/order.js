const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    CustomerID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    mobileID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    }


}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;