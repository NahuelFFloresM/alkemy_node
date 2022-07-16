var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



router.get('/', function(req, res, next) {
	res.status(200).send('Welcome to the beginning of nothingness.');
});

router.post('/mail',function(req, res, next) {
	/** Constante con datos recibidos en formato json */
	const { emailfrom } = req.body;
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);	
	const msg = {
		to: emailfrom, // Change to your recipient
		from: "arcangel_6191@hotmail.com", // Change to your verified sender
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	}
	sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
		res.status(200).send('Email enviado correctamente.');
  })
  .catch((error) => {
    console.error(error);
		res.status(500).send('Error de envio..')
  })
});


module.exports = router;
