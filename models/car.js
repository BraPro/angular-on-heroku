const mongoose = require('mongoose');

//car schema
const carSchema = new mongoose.Schema({
	_id: {type: Number, required: true},
	brand: {type: String, required: true},
	model: {type: String, required: true},
	year: {type: Number, required: true}
});

module.exports = Car = mongoose.model('Car', carSchema);