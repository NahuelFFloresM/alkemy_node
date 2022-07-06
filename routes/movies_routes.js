var express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize("sqlite::memory:");
var router = express.Router();

const Movie = require('../models/movies.js')(sequelize,DataTypes);

router.get('/', function(req, res, next) {
	Movie.findAll().then((movies) => {
		res.status(200).send('Welcome to the Characters DATA.');
		// Sequelize.close()
	})
});


module.exports = router;
