var express = require('express');
var router = express.Router();

const Genero = require('../models/genero.js');

router.get('/', function(req, res, next) {
	Genero.findAll().then((Generos) => {
		res.status(200).send(Generos);
	}).catch((err) =>{
		res.status(500).send({'message':'Hubo un error....','error':err});
	});
});

router.post('/', async function(req,res,next){
	await Genero.create({'nombre':req.body.nombre,'imagen':req.body.imagen})
	.then((item) => {
		res.status(200).send({'message':'Nuevo Genero creado', 'id':item.id});
	})
	.catch((err)=>{
		res.status(500).send({'message':'Hubo un problema...','error':err});
	});
})

router.put('/', async function(req,res,next){
	await Genero.update({'nombre':req.body.mobre},{
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

router.delete('/', async function (req,res,next){
	const delGen = await User.destroy({
		where: {
			id: req.body.id_genero
		}
	}).then((item) => {
		res.status(200).send({'message':'Genero Borrado'});
	})
	.catch((err)=>{
		res.status(500).send({'message':'Hubo un problema...','error':err});
	});

});


module.exports = router;
