'use strict'

require('dotenv').config()
const express = require("express");
const logger = require('morgan');
var path = require('path');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares/middlewares');

// This will be our application entry. We'll setup our server here.
const http = require('http');
// Set up the express app
const app = express();



// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

//Routes Import
var routes = require('./routes/index_routes');
var charactersRoutes = require('./routes/character_routes');
var moviesRoutes = require('./routes/movies_routes');
var generosRoutes = require('./routes/genero_routes');
var authRoutes = require('./routes/auth_routes');


// ROUTES
app.use('/characters', middlewares.isLoggedIn, charactersRoutes);
app.use('/movies', middlewares.isLoggedIn, moviesRoutes);
app.use('/genero', middlewares.isLoggedIn, generosRoutes);
app.use('/auth', authRoutes);
app.use('/', routes);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send('Oops, looks like theres no where to go...',));


// Conexion Base de Datos
const sequelize = require("./db");
sequelize.sync({force:false});

// Server Config
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;