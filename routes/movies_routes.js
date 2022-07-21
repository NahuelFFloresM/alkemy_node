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
		include: [{
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
		res.status(500).send({'message':'Hubo un problema...'});
	});		
});

router.post('/populate', async function (req,res,next){
	const pelicula = await Movie.findOne({where:{
		id: req.body.movie_id
	}});
	try {
		if (req.body.characters){
			const chars = await Personaje.findAll({where: {id:req.body.characters}});
			await pelicula.addPersonaje(chars);
		}
		if (req.body.generos){
			const generos = await Genero.findAll({where: {id:req.body.generos}});
			await pelicula.addGenero(generos);
		}
		res.status(200).send({'message':'Agregados Correctamente'});
	} catch (error) {
		res.status(500).send({'message':'Error inesperado'});
	}
	
});

router.put('/',async function(req,res,next){
	let img = req.body.imagen || 'default.png';
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
		res.status(500).send({'message':'Hubo un problema...'});
	});
});

router.delete('/',async function(req,res,next){
	await Movie.delete({where:{id:req.body.id_movie}})
	.then(
		res.status(200).send({'message':'Borrado con exito'})
	)
	.catch((err) =>{
		res.status(500).send({'message':'Hubo un problema...'});
	})
});

router.delete('/genero', async function(req,res,next){
	let gen = Genero.findOne({where:{id:req.body.id_genero}});
	try {
		if (gen){
			await Movie.findOne({where:{id:req.body.id_movie}}).removeGenero(gen)
			.then((resp) => {
				res.status(200).send({'message':'Borrado exitosamente'});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send({'message':'Error inesperado'});
			});
		} else {
			res.status(400).send({'message':'Genero inexistente'});
		};		
	} catch (error) {
		console.log(error);
		res.status(500).send({'message':'Error inesperado'});
	}	
});




module.exports = router;
