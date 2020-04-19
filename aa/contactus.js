const emailHandler = require('../extends/email');

module.exports = function (app, apiLocation) {
	
	//handle post request for contactus page
	app.post(apiLocation, function(req, res) {
		if((req.body.name == null) || (req.body.email == null) || (req.body.subject == null) || (req.body.comment == null))
				return res.redirect(pagesLocation.notfound);
		
		var text = 'Name: ' + req.body.name +'\nEmail: ' + req.body.email + '\nMessage: ' + req.body.comment;
		emailHandler.sendMail(emailHandler.email, req.body.subject, text); //send mail
		return res.json({response : 'Success', msg : 'Thanks for contacting us' });
	});
};