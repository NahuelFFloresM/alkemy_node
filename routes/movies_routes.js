var express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize("sqlite::memory:");
var router = express.Router();

const Movie = require('../models/movies.js');

router.get('/', function(req, res, next) {
	Movie.findAll().then((movies) => {
		res.status(200).send(movies);
	})
});

// router.post('/', async function(req, res, next) {
// 	const newMovie = Movie.create({'nombre':req.body.nombre,'imagen':req.body.imagen}).catch((err)=>{console.log(err)});
// });


module.exports = router;
