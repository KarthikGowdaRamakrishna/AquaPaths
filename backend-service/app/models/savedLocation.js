var mongoose = require("mongoose");

const Properties = new mongoose.Schema({
    distance: { type: Number },
    mode: { type: String },
    departure: { type: Date },
    arrival: { type: Date },
    duration: { type: Number }
});

const savedLocation= new mongoose.Schema({
    srcCoordinates: { type: String, required: true },
    destCoordinates: { type: String, required: true },
    blockIceCaps: {type:Boolean},
    allowPanama:{type:Boolean},
    allowSuez:{type:Boolean},
});

module.exports = savedLocation;