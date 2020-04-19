const Car = require('../models/car');
const Treatment = require('../models/treatment');
const Customer = require('../models/customer');

module.exports = function (app, apiLocation) {

	//get all cars
	app.get(apiLocation, function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Car.find({}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});
	
	//get car by id
	app.get(apiLocation + '/:id', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Car.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});

	//get car full by id
	app.get(apiLocation + '/:id/full', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Car.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});
			var fullCar = result;
			Customer.find({cars: result._id}, (err, result) => {
				fullCar.customers = result;
				Treatment.find({car: result._id}, (err, result) => {
					fullCar.treatments = result;
					return res.json(fullCar);
				});
			});
		});
	});

	//get car treatments by id
	app.get(apiLocation + '/:id/customers', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Car.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});
			Customer.find({cars: result._id}, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});

	//get car treatments by id
	app.get(apiLocation + '/:id/treatments', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Car.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});
			Treatment.find({car: result._id}, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});

	//add car
	app.post(apiLocation + '/add', function(req, res) {
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests

		var updateCar =  new Car(req.body);
		updateCar.save(err => {
			if(err){
				if(err.code == 11000)
					return res.json({response : 'Error', msg : 'Car already exists in the system'}); 
				return res.json({response : 'Error'})
			}

			return res.json({response : 'Success', msg : 'Successfully added car'});
		});
	});

	//update car
	app.put(apiLocation + '/:id', function(req, res) {
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		req.body._id = Number(req.params.id);
		var updateCar =  new Car(req.body);
		Car.findByIdAndUpdate(Number(req.params.id), { $set: updateCar }, (err, result) => {
			if(err || result == null) return res.json({response : 'Error'});
			
			return res.json({response : 'Success', msg : 'Car number ' + updateCar._id + ' was updated'}); 
		});
	});
	
	//delete car
	app.delete(apiLocation + '/:id', function(req, res) {
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests

		Car.findByIdAndRemove(Number(req.params.id), (err, result) => {
			if (err) return res.json({response : 'Error'});

			if(result == null) return res.json({response : 'Error', msg : 'Car doesnt exist'}); 
			return res.json({response : 'Success', msg : 'Car number ' + Number(req.params.id) + ' was deleted'}); 
		});
	});
};