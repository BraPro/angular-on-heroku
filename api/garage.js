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
					var lastyear = new Date(Date.now());
					lastyear.setMonth(lastyear.getMonth() - 12);
					var now = new Date(Date.now());
					Treatment.aggregate([
						{
							$match: {
								garage: Number(req.params.id),
							},
						},
						{
							$match: {
								date: {
									$gte: lastyear,
									$lte: now
								}
							},
						},
						{
							$project: {
								id: "$garage",
								year: {$year: "$date"},
								month: {$month: "$date"},
								day: {$dayOfMonth: "$date"},
								cost: "$cost"
							}
						},
						{
							$group: {
								_id: {
									month: "$month",
									year: "$year"
								},
								count: {
									$sum: { "$sum" : 1 } ,
								},
								cost: {
									$sum: { "$sum" : "$cost" } ,
								}
							}	
						}
					],  (err, result) => {
						if(err) return res.json({response : 'Error'});
						fullGarage.report = result;
						return res.json(fullGarage);
					 });
				});
			});
		});
	});

	//get garages report
	app.get(apiLocation + '/ancc', function(req, res) {
		console.log('a');
		return res.json({'a':'a'});
		
		Garage.find({}, (err, result) => {
			console.log('a');
			if(err) return res.json({response : 'Error'});
			 
			async function processItems(result){
				for(element of result) {
					var fullGarage = element.toJSON();
					const mang = await Employee.findById(fullGarage.manager);
					delete mang.password;
					fullGarage.manager = mang;
					const emps = await Employee.find({garage: fullGarage._id});
					fullGarage.employees = emps.length;
					var lastyear = new Date(Date.now());
					lastyear.setMonth(lastyear.getMonth() - 12);
					var now = new Date(Date.now());
					const trtms = await Treatment.aggregate([
								{
									$match: {
										garage: Number(element._id),
									},
								},
								{
									$match: {
										date: {
											$gte: lastyear,
											$lte: now
										}
									},
								},
								{
									$project: {
										id: "$garage",
										year: {$year: "$date"},
										month: {$month: "$date"},
										day: {$dayOfMonth: "$date"},
										cost: "$cost"
									}
								},
								{
									$group: {
										_id: {
											month: "$month",
											year: "$year"
										},
										count: {
											$sum: { "$sum" : 1 } ,
										},
										cost: {
											$sum: { "$sum" : "$cost" } ,
										}
									}	
								}
							]);
						fullGarage.report = trtms;
					};
					return res.json(result);
				}
			processItems(result);
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
	app.get(apiLocation + '/:id/treatments', function(req, res) {	
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