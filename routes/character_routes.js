var express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize("sqlite::memory:");
var router = express.Router();


const Characters = require('../models/personaje.js')(sequelize,DataTypes);

router.get('/', function(req, res, next) {

	Characters.findAll().then((users) => {
		res.status(200).send(users);
	})
	
});

router.post('/',function(req,res,next){
	console.log(req.params);
	res.status(200).send('Created');
});

router.put('', function(req,res,next){
	console.log(req.params);
	res.status(200).send('Updated');
})


module.exports = router;
