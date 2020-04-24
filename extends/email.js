const nodemailer = require('nodemailer')
const projectConfigEmail = require('../config').email

//define gmail login user and password to nodemailer
const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
    port: 465,
    secure: true,
	auth: { user: projectConfigEmail.username, pass: projectConfigEmail.password }
});

//test mail sender
function sendMail(to, subject, text){
	var mailOptions = {
	to: to,
	subject: subject,
	text: text
	};
	transporter.sendMail(mailOptions, function(error, info){
		console.log(projectConfigEmail.username);
		console.log(projectConfigEmail.password);
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response + ' to ' + mailOptions.to);
		}
	});
}

module.exports = {sendMail};