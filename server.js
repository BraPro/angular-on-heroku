const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('./jwt');
const errorHandler = require('./errorHandler');

const projectConfig = require('./config');
const mongooseUrl = process.env.MONGODB_URI || projectConfig.db.url;
const port = process.env.PORT || projectConfig.port;
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json());							// support json encoded bodies
app.use(cors());
app.use(jwt());
app.use(errorHandler);
//app.use(session({secret: projectConfig.jwtSecret, resave:false, saveUninitialized:true}));

require('./api/user')(app, '/api/users');			//handle users requests
require('./api/employee')(app, '/api/employees');	//handle employees requests
require('./api/manager')(app, '/api/managers');		//handle managers requests
require('./api/treatment')(app, '/api/treatments');	//handle treatments requests
require('./api/garage')(app, '/api/garages');		//handle garages requests

//init server => mongodb & port listen
mongoose.connect(mongooseUrl,  {dbName: projectConfig.db.name, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false }).then(() => {
	console.log("DB connected");
	app.listen(port);
	console.log("Server is running, port:" + port);
 }
).catch(error  => { console.log("Cannot connect DB"); });

//block fav.ico
app.get('/favicon.ico', function(req, res) {
	res.end();
});