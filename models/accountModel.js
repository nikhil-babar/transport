const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;