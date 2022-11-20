const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    _id: Number, // route number
    source: String,
    destination: String,
    distance: Number,
    fare: Number
})

const routeModel = mongoose.model("Route", routeSchema);

module.exports = routeModel;