var express = require('express');
var router = express.Router();

const Movie = require('../models/pelicula.js');
const Characters = require('../models/personaje.js');

router.get('/', async function(req, res, next) {
	Characters.findAll({
		where: req.query
	}).then( (users) => {
		res.status(200).send(users);
	}).catch((error) => {
		res.status(404).send({'message':'Error en los datos pedidos'})
	});
});

router.get('/:id/detalle', async function(req, res, next) {
	Characters.findOne({
		where:{
			id:req.params.id
		},
		include: Movie
	}).then( (user) => {
		res.status(200).send(user);
	}).catch((error) => {
		res.status(404).send({'message':'Error en los datos pedidos'})
	});
});

router.post('/',async function(req,res,next){
	await Characters.create({
		'nombre':req.body.nombre,
		'edad':req.body.edad,
		'peso':req.body.peso,
		'historia':req.body.historia,
		'imagen':req.body.imagen
	}).then((item) => {
		res.status(200).send({'message':'Nuevo Personaje creado ', 'id':item.id});
	})
	.catch((err)=>{
		console.log(err);
			res.status(500).send({'message':'Hubo un problema...'});
	});
});

router.put('/', async function(req,res,next){
	await Characters.update({
		'nombre':req.body.nombre,
		'edad':req.body.edad,
		'peso':req.body.peso,
		'historia':req.body.historia,
		'imagen':req.body.imagen
	},{
		where:{
			id: req.body.id_personaje
		}
	}).then((item) => {
		res.status(200).send({'message':'Personaje editado', 'id':item.id});
	})
	.catch((err)=>{
		res.status(500).send({'message':'Hubo un problema...'});
	});
});

router.delete('/:id',async function(req,res,next){
	await Characters.delete({where:{id:req.params.id}})
	.then(
		res.status(200).send({'message':'Borrado con exito'})
	)
	.catch((err) =>{
		res.status(500).send({'message':'Hubo un problema...'});
	});
});


module.exports = router;
