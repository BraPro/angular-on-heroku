const mongoose = require('mongoose');

//location schema
const locationSchema = new mongoose.Schema({
	country: {type: String, required: true},
	city: {type: String, required: true},
	street: {type: String, required: true},
	coordinates: { type: {
		latitude:  { type: Number },
		latitude:  { type: Number }
	}},
});

module.exports = Location = mongoose.model('Location', locationSchema);