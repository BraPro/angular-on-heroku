const Employee = require('../models/employee');
const Counter = require('../models/counter');
const Garage = require('../models/garage');
const htmlspecialchars = require('htmlspecialchars');

module.exports = function (app, apiLocation) {
  
	//get all employees
	app.get(apiLocation, function(req, res) {	
		Employee.find({}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			return res.json(result);
		});
	});
	
	//get full all employees
	app.get(apiLocation + '/full', function(req, res) {	
		Employee.find({}, (err, result) => {
			if(err) return res.json({response : 'Error'});
			async function processItems(result){
				for(element of result) {
					if(element.garage == null) {
						const mang = await Employee.findById(1);
						element.manager = mang;
					} else{
						const gara =  await Garage.findById(element.garage);
						element.garage = gara;
						const mang = await Employee.findById(Number(element.garage.manager));
						element.manager = mang;
					}	
				}
				return res.json(result);
			};
			processItems(result);
		});
	});

	//get employee by id
	app.get(apiLocation + '/:id', function(req, res) {	
		Employee.findById(Number(req.params.id),  (err, result) => {
			if(err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Employee doesnt exist'}); 
			return res.json(result);
		});
	});

	//get employee full by id
	app.get(apiLocation + '/:id/full', function(req, res) {	
		Employee.findById(Number(req.params.id), async (err, result) => {
			if(err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Employee doesnt exist'}); 
			var fullEmployee = result;
			if(fullEmployee.garage == null){
				const mang = await Employee.findById(1);
				fullEmployee.manager = mang;
			}else{
				const gara =  await Garage.findById(fullEmployee.garage);
				fullEmployee.garage = gara;
				const mang = await Employee.findById(Number(fullEmployee.garage.manager));
				fullEmployee.manager = mang;
			}
			return res.json(fullEmployee);
		});
	});

	//get employee manager by id
	app.get(apiLocation + '/:id/manager', function(req, res) {	
		Employee.findById(Number(req.params._id), async (err, result) => {
			if(err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Employee doesnt exist'}); 
			if(result.garage == null){
				const mang = await Employee.findById(1);
				return res.json(mang);
			}else{
				const gara =  await Garage.findById(result.garage);
				const mang = await Employee.findById(Number(gara.manager));
				return res.json(mang);
			}
		});
	});

	//get employee garage by id
	app.get(apiLocation + '/:id/garage', function(req, res) {	
		Employee.findById(Number(req.params._id), (err, result) => {
			if(err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Employee doesnt exist'}); 
			Garage.findById(result.garage, (err, result) => {
				if(err) return res.json({response : 'Error'});
				return res.json(result);
			});
		});
	});

	//update employee
	app.put(apiLocation + '/:id', function(req, res) {
		var updateEmployee =  new Employee(req.body);
		updateEmployee._id = Number(req.params._id);

		/*
		if(req.params.action == 'SetRole') {
			Employee.findById(updateEmployee._id, (err, result) => {
				if(err) return res.json({response : 'Error'});
				if(result == null) return res.json({response : 'Error', msg : 'Employee doesnt exist'}); 

				if(updateEmployee.status == 'Admin' || result.status == 'Admin') {
					return res.json({response : 'Error', msg : 'Admin roles cannot be changed!'}); 
				}

				if(updateEmployee.status == 'Manager') {

					return res.json({response : 'Error', msg : 'Admin roles cannot be changed!'}); 
				}

				if(updateEmployee.status == 'Employee'){
					//if(result.status == 'None' || result.status == 'New Employee')
					//updateEmployee.manager = 1;
					if(result.status == 'Manager'){
						Garage.findById(updateEmployee.garage, (err, result) => {
							if(err) return res.json({response : 'Error'});
							if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
							if(garage.manager == 1){
								garage.manager = updateEmployee._id;
								Garage.findByIdAndUpdate(garage._id, { $set: garage }, (err, result) => {
									if(err) return res.json({response : 'Error'});
									if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
									return res.json({response : 'Success', msg : 'Employee number ' + updateEmployee._id + ' was updated'}); 
								});
							}
						});
					}
				}

				if(updateEmployee.status == 'None' || updateEmployee.status == 'New Employee'){
					//if(result.status == 'None' || result.status == 'New Employee')
					//updateEmployee.manager = 1;
					if(result.status == 'Manager'){
						Garage.findById(updateEmployee.garage, (err, result) => {
							if(err) return res.json({response : 'Error'});
							if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
							if(garage.manager == 1){
								garage.manager = updateEmployee._id;
								Garage.findByIdAndUpdate(garage._id, { $set: garage }, (err, result) => {
									if(err) return res.json({response : 'Error'});
									if(result == null) return res.json({response : 'Error', msg : 'Garage doesnt exist'}); 
									return res.json({response : 'Success', msg : 'Employee number ' + updateEmployee._id + ' was updated'}); 
								});
							}
						});
					}
				}

				Employee.findByIdAndUpdate(updateEmployee._id, { $set: updateEmployee }, (err, result) => {
					if(err) return res.json({response : 'Error'});
					if(result == null) return res.json({response : 'Error', msg : 'Employee doesnt exist'}); 
					return res.json({response : 'Success', msg : 'Employee number ' + updateEmployee._id + ' was updated'}); 
				});

				//return res.json({response : 'Success', msg : 'Employee number ' + updateEmployee._id + ' was updated'}); 
			});
		} else {
			//if(req.params.action == 'Edit' || req.params.action == 'ResetPassword')
			Employee.findByIdAndUpdate(updateEmployee._id, { $set: updateEmployee }, (err, result) => {
				if(err) return res.json({response : 'Error'});
				if(result == null) return res.json({response : 'Error', msg : 'Employee doesnt exist'}); 
				return res.json({response : 'Success', msg : 'Employee number ' + updateEmployee._id + ' was updated'}); 
			});
		}
		*/
	});
	
	/*
	//delete employee
	app.delete(apiLocation + '/:id', function(req, res) {
		Employee.findByIdAndUpdate(Number(req.params._id), (err, result) => {
			if (err) return res.json({response : 'Error'});
			if(result == null) return res.json({response : 'Error', msg : 'Employee doesnt exist'}); 
			return res.json({response : 'Success', msg : 'Employee number ' + Number(req.params._id) + ' was deleted'}); 
		});
	});
	*/
};