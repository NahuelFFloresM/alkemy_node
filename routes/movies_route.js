var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	// Find all users
	const characters = await User.findAll();
	res.status(200).send('Welcome to the Characters DATA.');
});


module.exports = router;
