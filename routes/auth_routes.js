var express = require('express');
var router = express.Router();

const usuario = require('../models/usuarios');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async function(req, res, next) {
	// let userexiste = await usuarioExiste('email@example.com');
	try {
		const { email, contrasena } = req.body;
		await usuario.findOne({where:{
			'email':email,
		}}).then(async (item) => {
			if(item){
				let response = await bcrypt.compare(contrasena, item.contrasena);
				if (response){
					const token = jwt.sign(
						{ user_id: item.id, email },
						process.env.TOKEN_KEY,
						{
							expiresIn: "2h",
						}
						);
					res.status(200).send({'message':'Credenciales correctas','token':token});
				} else res.status(401).send({'message':'Credenciales incorrectas'});
			} else {
				res.status(400).send({'message':'Usuario Inexistente'});
			}
		}).catch((err) =>{
			res.status(500).send({'message':'Error inesperado..'})
		});
	} catch (error) {
		res.status(400).send({'message':'Faltan datos'});
	}
});

router.post('/register', async function(req, res, next) {
	try{
		// TO DO- CHEQUEO DE USUARIO EXISTENTE
		const { nombre, apellido,email,contrasena } = req.body;
		if (contrasena.length > 0){
			let bpass = await bcrypt.hash(contrasena,10);
			await usuario.create({
				'nombre':nombre,
				'apellido':apellido,
				'email':email,
				'contrasena':bpass
			}).then((item) => {
				res.status(200).send({'message':'Usuario creado correctamente'});
			});
		} else {
			res.status(400).send({'message':'No se recibio ninguna contraseña'});
		}
	}catch(err){
		res.status(500).send({'message':'Hubo un problema..','error':err})
	}
});

module.exports = router;
