const mongoose = require('mongoose');
const account = require('./accountModel');

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
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