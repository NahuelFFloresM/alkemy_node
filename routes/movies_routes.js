var express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize("sqlite::memory:");
var router = express.Router();

const Movie = require('../models/pelicula.js');
const Personaje = require('../models/personaje');
const Genero = require('../models/genero.js');

router.get('/', function(req, res, next) {
	Movie.findAll({
		attributes: ['imagen', 'titulo','fecha_creacion']
	}).then((movies) => {
		res.status(200).send(movies);
	}).catch((err) =>{
		res.status(500).send({'message':'Hubo un error...'});
	});
});

router.get('/detalle/:id', function(req, res, next) {
	Movie.findAll({
		include: [{// Notice `include` takes an ARRAY
			model: Personaje
		}]
	}).then((movies) => {
		res.status(200).send(movies);
	}).catch((err) =>{
		res.status(500).send({'message':'Hubo un error...'});
	});
});

router.post('/', async function(req, res, next) {

	await Movie.create({
		'titulo':req.body.titulo,
		'imagen':req.body.imagen,
		'fecha_creacion':req.body.fecha_creacion,
		'calificacion':req.body.calificacion
	}).then((item)=>{
		res.status(200).send({'message':'Nueva Peli creada', 'id':item.id})
	})
	.catch((err)=>{
		console.log(err);
			res.status(500).send({'message':'Hubo un problema...','error':err});
	});		
});
// TO DO- POST PARA AGREGAR GENERO A LA PELICULA

router.put('/',async function(req,res,next){
	let img = req.body.imagen || 'default.png';
	//**TO DO, UPDATE BY PARTS AND FOREIGN KEY*/
	await Movie.update({
		'titulo':req.body.titulo,
		'imagen':img,
		'fecha_creacion':req.body.creacion,
		'calificacion':req.body.calificacion
	},{
		where:{
			id: req.body.id_genero
		}
	}).then((item) => {
		res.status(200).send({'message':'Genero editado', 'id':item.id});
	})
	.catch((err)=>{
		res.status(500).send({'message':'Hubo un problema...','error':err});
	});
});

router.delete('/',async function(req,res,next){
	await Movie.delete({where:{id:req.body.id_movie}})
	.then(
		res.status(200).send({'message':'Borrado con exito'})
	)
	.catch((err) =>{
		res.status(500).send({'message':'Hubo un problema...','error':err});
	})
});




module.exports = router;
