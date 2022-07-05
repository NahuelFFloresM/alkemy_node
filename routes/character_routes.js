var express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize("sqlite::memory:");
var router = express.Router();


const Characters = require('../models/personaje.js')(sequelize,DataTypes);

router.get('/', function(req, res, next) {
	Characters.findAll().then((users) => {
		res.status(200).send('Welcome to the Characters DATA.');
		// Sequelize.close()
	})
	
});


module.exports = router;
