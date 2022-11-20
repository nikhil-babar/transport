const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    _id: String, // number plate
    model: String,
    type: String,
    name: String,
})

const vehicleModel = mongoose.model("Vehicle", vehicleSchema);

module.exports = vehicleModel;