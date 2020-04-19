const mongoose = require('mongoose');
const Person = require('./person');

const customerSchema = new mongoose.Schema({
	cid: {type: Number, required: true, unique: true },
	cars: [{ type: Number, ref: 'Car' }]
});

customerSchema.index({ id: 1, __t: 1}, { unique: true });
module.exports = Customer = Person.discriminator('Customer', customerSchema);