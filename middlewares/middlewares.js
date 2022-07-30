const jwt = require('jsonwebtoken');

// const User = require('../models/usuarios');

const middlewares = {

  isLoggedIn : async function (req, res, next) {
    const token = req.headers['authorization'] || req.body.token || req.query.token || req.headers["x-access-token"];
    if (token){
      try {
        auth = await jwt.verify(token.split(' ')[1], process.env.TOKEN_KEY)
        next();
      } catch (err) {
        res.status(402).send({'message':'Sesion expirada'})
      }
    } else {
      res.status(401).send({'message':'Sin permisos, favor de loguearse.'});
    }
  }
};
module.exports = middlewares;