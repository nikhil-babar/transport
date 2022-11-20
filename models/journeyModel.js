const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route'
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
});


const journeyModel = mongoose.model("Journey", journeySchema);

module.exports = journeyModel;