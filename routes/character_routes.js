var express = require('express');
var router = express.Router();

const Movie = require('../models/pelicula.js');
const Characters = require('../models/personaje.js');

router.get('/', async function(req, res, next) {
	
	Characters.findAll().then( (users) => {
		res.status(200).send(users);
	}).catch((error) => {
		console.log(error);
	});

});

router.post('/',async function(req,res,next){
	// const peli = await Movie.findOne({where:{id:req.body.id_movie}});
	await Characters.create({
		'nombre':req.body.nombre,
		'edad':req.body.edad,
		'peso':req.body.peso,
		'historia':req.body.historia,
		'imagen':req.body.imagen
	}).then((item) => {
			res.status(200).send({'message':'Nuevo Personaje creado ', 'id':item.id});
	})
	// char.addPelicula(peli).then(async (item) => {
	// 	// const gen = await Genero.findOne({where:{id:req.body.id_genero}});
	// 	// Movie.addGenero(gen).then(res.status(200).send({'message':'Nuevo Genero creado', 'id':item.id}));
	// 	res.status(200).send({'message':'Nuevo Personaje creado y asignado a la pelicula', 'id':item.id})
	// })
	.catch((err)=>{
		console.log(err);
			res.status(500).send({'message':'Hubo un problema...','error':err});
	});		
	// await Characters.create({nombre:req.body.nombre,edad:req.body.edad,peso:req.body.peso,historia:req.body.historia,imagen:req.body.imagen});
	// res.status(200).send('Created'+ newChar.Id);
});

// router.post('/')

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
		res.status(500).send({'message':'Hubo un problema...','error':err});
	});
});

router.delete('/',async function(req,res,next){
	await Characters.delete({where:{id:req.body.id_personaje}})
	.then(
		res.status(200).send({'message':'Borrado con exito'})
	)
	.catch((err) =>{
		res.status(500).send({'message':'Hubo un problema...','error':err});
	});
});


module.exports = router;
