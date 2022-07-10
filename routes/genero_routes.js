var express = require('express');
var router = express.Router();

const Genero = require('../models/genero.js');

router.get('/', function(req, res, next) {
	Genero.findAll().then((Generos) => {
		res.status(200).send(Generos);
	})
});

router.post('/', async function(req,res,next){
	const newGen = await Genero.create({'nombre':req.body.nombre,'imagen':req.body.imagen}).catch((err)=>{console.log(err)});
	res.status(200).send({'message':'Nuevo Genero creado', 'id':newGen.id});	
})


module.exports = router;
