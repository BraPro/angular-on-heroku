const mongoose = require('mongoose');
const Person = require('./person');

const employeeSchema = new mongoose.Schema({
	eid: {type: Number, required: true, unique: true },
	email: {type: String, required: true, lowercase: true, unique: true},
	password: {type: String, required: true},
	garage: { type: Number, ref: 'Garage' },
	manager: { type: Number, ref: 'Employee' },
	status: {type: String, enum : ['New Employee','Employee', 'Manager'], default: 'New Employee', required: true},
	//token
});

employeeSchema.index({ id: 1, __t: 1}, { unique: true });
module.exports = Employee = Person.discriminator('Employee', employeeSchema);