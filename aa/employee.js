const Employee = require('../models/employee');
const Counter = require('../models/counter');
const Garage = require('../models/garage');
const htmlspecialchars = require('htmlspecialchars');

module.exports = function (app, apiLocation) {
  
	//get all employees
	app.get(apiLocation, function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.find({}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});
	
	//get employee by id
	app.get(apiLocation + '/:id', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.findOne({eid : Number(req.params.id)}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});

	//get employee full by id
	app.get(apiLocation + '/:id/full', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.findOne({eid : Number(req.params.id)}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			var fullEmployee = result;
			Employee.findOne({eid: result.manager}, (err, result) => {
				fullEmployee.manager = result;
				Garage.findById(fullEmployee.garage, (err, result) => {
					fullEmployee.garage = result;
					return res.json(fullEmployee);
				});
			});
		});
	});

	//get employee manager by id
	app.get(apiLocation + '/:id/manager', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.findById({eid : Number(req.params.id)}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			Employee.findOne({eid: result.manager}, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});

	//get employee garage by id
	app.get(apiLocation + '/:id/garage', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.findById({eid : Number(req.params.id)}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			Garage.findById(result.garage, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});

	//update employee
	app.put(apiLocation + '/:id', function(req, res) {
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		req.body.eid = Number(req.params.id);
		var updateEmployee =  new Employee(req.body);
		Employee.findOneAndUpdate({eid: req.body.eid}, { $set: updateEmployee }, (err, result) => {
			if(err || result == null) return res.json({response : 'Error'});
			
			return res.json({response : 'Success', msg : 'Employee number ' + updateEmployee.eid + ' was updated'}); 
		});
	});
	
	//delete employee
	app.delete(apiLocation + '/:id', function(req, res) {
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests

		Employee.findOneAndDelete({eid : Number(req.params.id)}, (err, result) => {
			if (err) return res.json({response : 'Error'});

			if(result == null) return res.json({response : 'Error', msg : 'Employee doesnt exist'}); 
			return res.json({response : 'Success', msg : 'Employee number ' + Number(req.params.id) + ' was deleted'}); 
		});
	});
};