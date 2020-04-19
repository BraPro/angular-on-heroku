const Employee = require('../models/employee');
const Garage = require('../models/garage');

module.exports = function (app, apiLocation) {
  
	//get all employees
	app.get(apiLocation, function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.find({status: 'Manager'}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});
	
	//get manager by id
	app.get(apiLocation + '/:id', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.findOne({eid : Number(req.params.id), status: 'Manager'}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});

	//get manager full by id
	app.get(apiLocation + '/:id/full', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.findOne({eid : Number(req.params.id), status: 'Manager'}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			var fullManager = result;
			Employee.find({manager: result.eid}, (err, result) => {
				fullManager.employees = result;
				Garage.findById(fullManager.garage, (err, result) => {
					fullManager.garage = result;
					return res.json(fullManager);
				});
			});
		});
	});

	//get manager employees by id
	app.get(apiLocation + '/:id/employees', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.findById({eid : Number(req.params.id), status: 'Manager'}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			Employee.find({manager: result.eid}, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});

	//get employee garage by id
	app.get(apiLocation + '/:id/garage', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Employee.findById({eid : Number(req.params.id), status: 'Manager'}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			Garage.findById(result.garage, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});
};