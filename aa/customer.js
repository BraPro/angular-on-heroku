const Customer = require('../models/customer');
const Counter = require('../models/counter');
const Treatment = require('../models/treatment');
const Car = require('../models/car');

module.exports = function (app, apiLocation) {
  
	//init customer schema => _id is increment key
	var counter = new Counter({_id: Customer.collection.collectionName});
	counter.save(err => {
		if(err) console.log('Counter of customers is already exists');
	});

	//get all customers
	app.get(apiLocation, function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Customer.find({}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});
	
	//get customer by id
	app.get(apiLocation + '/:id', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Customer.findOne({cid : Number(req.params.id)}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});

	//get customer full by id
	app.get(apiLocation + '/:id/full', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Customer.findOne({cid : Number(req.params.id)}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			var fullCustomer = result;
			Car.find({_id: { "$in": result.cars}}, (err, result) => {
				fullCustomer.cars = result;
				Treatment.find({customer: result.cid}, (err, result) => {
					fullCustomer.treatments = result;
					return res.json(fullCustomer);
				});
			});

		});
	});

	//get customer cars by id
	app.get(apiLocation + '/:id/cars', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Customer.findOne({cid : Number(req.params.id)}, (err, result) => {
			if(err) return res.json({response : 'Error'});

			Car.find({_id: { "$in": result.cars}}, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});

		});
	});

	//get customer treatments by id
	app.get(apiLocation + '/:id/treatments', function(req, res) {	
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		Customer.findOne({cid : Number(req.params.id)}, (err, result) => {
			if(err) return res.json({response : 'Error'});

			Treatment.find({customer: result.cid}, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});

		});
	});
	
	//add customer
	app.post(apiLocation + '/add', function(req, res) {
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests

		Counter.findByIdAndUpdate(counter, { $inc: { seq: 1 } }, { new: true }, (err, result) => {
			if(err) return res.json({response : 'Error'});

			req.body.cid = Number(result.seq);
			var newCustomer =  new Customer(req.body);
			newCustomer.save(err => {
				if(err) return res.json({response : 'Error'})
	
				return res.json({response : 'Success', msg : 'Successfully added customer'});
			});
		});
	});
	
	//update customer
	app.put(apiLocation + '/:id', function(req, res) {
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests
		
		req.body.eid = Number(req.params.id);
		var updateCustomer =  new Customer(req.body);
		Customer.findOneAndUpdate({cid: req.body.eid}, { $set: updateCustomer }, (err, result) => {
			if(err || result == null) return res.json({response : 'Error'});
			
			return res.json({response : 'Success', msg : 'Customer number ' + updateCustomer.cid + ' was updated'}); 
		});
	});
	
	//delete customer
	app.delete(apiLocation + '/:id', function(req, res) {
		//if(!req.session.user) return res.json({response : 'Error'}); //block guests

		Customer.findOneAndDelete({cid : Number(req.params.id)}, (err, result) => {
			if (err) return res.json({response : 'Error'});

			if(result == null) return res.json({response : 'Error', msg : 'Customer doesnt exist'}); 
			return res.json({response : 'Success', msg : 'Customer number ' + Number(req.params.id) + ' was deleted'}); 
		});
	});
};