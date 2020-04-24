const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
	_id: {type: Number, required: true},
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},

	email: {type: String, required: true, lowercase: true, unique: true},
	password: {type: String, required: true},
	garage: { type: Number, ref: 'Garage' },
	manager: { type: Number, ref: 'Employee', default: 0 },
	status: {type: String, enum : ['New Employee','Employee', 'Manager', 'None'], default: 'New Employee', required: true},
	//token
});

module.exports = Employee = mongoose.model('Employee' ,employeeSchema);