const Garage = require('../models/garage');
const Counter = require('../models/counter');
const Employee = require('../models/employee');
const Treatment = require('../models/treatment');

module.exports = function (app, apiLocation) {

	//init garages schema => _id is increment key
	var counter = new Counter({_id: Garage.collection.collectionName});
	counter.save(err => {
		if(err) console.log('Counter of garages is already exists');
	});

	//get all garages
	app.get(apiLocation, function(req, res) {	
		Garage.find({}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});
	
	//get garage by id
	app.get(apiLocation + '/:id', function(req, res) {		
		Garage.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
			return res.json(result);
		});
	});

	//get garage report by id
	app.get(apiLocation + '/:id/report', function(req, res) {		
		Garage.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
			var fullGarage = result.toJSON();
			Employee.findById(result.manager, (err, result) => {
				if(err) return res.json({response : 'Error'});
				result = result.toJSON();
				delete result.password;
				fullGarage.manager = result;
				Employee.find({garage: fullGarage._id}, (err, result) => {
					if(err) return res.json({response : 'Error'});
					fullGarage.employees = result.length;
					Treatment.aggregate([{$match: {garage: result._id}},
						{
							$group: {
								_id: {
									"day": { $dayOfMonth : $date },
									"month": { $month : $date },
									"year": { $year : $date }
								},
								count: {
									$sum: { "$sum" : 1 } ,
								},
							}
					}],  (err, result) => {

						console.log(result);
						return res.json(fullGarage);

					 });

					 /*
					 	reatment.find({garage: result._id}, (err, result) => {
						fullGarage.treatments = result;
						return res.json(fullGarage);
					});
					*/
				});
			});
		});
	});

	//get garage full by id
	app.get(apiLocation + '/:id/full', function(req, res) {		
		Garage.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
			var fullGarage = result;
			Employee.findById(result.manager, (err, result) => {
				fullGarage.manager = result;
				Employee.find({garage: result._id}, (err, result) => {
					fullGarage.employees = result;
					Treatment.find({garage: fullGarage._id}, (err, result) => {
						fullGarage.treatments = result;
						return res.json(fullGarage);
					});
				});
			});
		});
	});

	//get garage manager by id
	app.get(apiLocation + '/:id/manager', function(req, res) {		
		Garage.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
			Employee.findById(result.manager, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});

	//get garage employees by id
	app.get(apiLocation + '/:id/employees', function(req, res) {		
		Garage.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});	
			if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
			Employee.find({garage: result._id}, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});

	//get garage treatments by id
	app.get(apiLocation + '/:id/employees', function(req, res) {	
		Garage.findById(Number(req.params.id), (err, result) => {
			if(err) return res.json({response : 'Error'});	
			if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
			Treatment.find({garage: result._id}, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});

	//add garage
	app.post(apiLocation + '/add', function(req, res) {
		Counter.findByIdAndUpdate(counter, { $inc: { seq: 1 } }, { new: true }, (err, result) => {
			if(err) return res.json({response : 'Error'});
			req.body._id = Number(result.seq);
			var newGarage =  new Garage(req.body);
			newGarage.save(err => {
				if(err) return res.json({response : 'Error'})
	
				return res.json({response : 'Success', msg : 'Successfully added garage'});
			});
		});
	});

	//update garage
	app.put(apiLocation + '/:id', function(req, res) {	
		req.body._id = Number(req.params.id);
		var updateGarage =  new Garage(req.body);
		Garage.findByIdAndUpdate(Number(req.params.id), { $set: updateGarage }, (err, result) => {
			if(err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
			return res.json({response : 'Success', msg : 'Garage number ' + updateGarage._id + ' was updated'}); 
		});
	});
	
	//delete garage
	app.delete(apiLocation + '/:id', function(req, res) {
		Garage.findByIdAndRemove(Number(req.params.id), (err, result) => {
			if (err) return res.json({response : 'Error'});

			if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
			return res.json({response : 'Success', msg : 'Garage number ' + Number(req.params.id) + ' was deleted'}); 
		});
	});
};