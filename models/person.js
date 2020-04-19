const mongoose = require('mongoose');

//person schema
const personSchema = new mongoose.Schema({
	id: {type: Number, required: true},
	firstname: {type: String, required: true},
	lastname: {type: String, required: true}
});

module.exports = Person = mongoose.model('Person', personSchema);