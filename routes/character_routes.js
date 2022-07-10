var express = require('express');
var router = express.Router();


const Characters = require('../models/personaje.js');

router.get('/', async function(req, res, next) {
	
	Characters.findAll().then( (users) => {
		res.status(200).send(users);
	}).catch((error) => {
		console.log(error);
	});
	
});

router.post('/',async function(req,res,next){
	console.log(req.body);
	const newChar = await Characters.create({nombre:req.body.nombre,edad:req.body.edad,peso:req.body.peso,historia:req.body.historia,imagen:req.body.imagen});
	res.status(200).send('Created'+ newChar.Id);
});

router.put('', function(req,res,next){
	console.log(req.body);
	res.status(200).send('Updated');
})


module.exports = router;
