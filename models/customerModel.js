const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    _id: String,
    name: String,
    age: Number,
    contactNo: {
        type: Number,
        min: 1000000000,
        max: 9999999999
    },
    userName: String,
    password: String,
});


const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;