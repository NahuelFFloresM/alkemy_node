'use strict'
require('dotenv').config()

const express = require("express");
const logger = require('morgan');
const {Sequelize,DataTypes} = require("sequelize");
var path = require('path');
const bodyParser = require('body-parser');

// This will be our application entry. We'll setup our server here.
const http = require('http');
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
     host: process.env.DB_HOST,
     dialect:'mysql'
});



/**
 * Testing Connection
 */
// try {
//      sequelize.authenticate();
//      console.log('Connection has been established successfully.');
// } catch (error) {
//      console.error('Unable to connect to the database:', error);
// }

//Routes Import
var routes = require('./routes/index_routes');
var charactersRoutes = require('./routes/character_routes');


// ROUTES
app.use('/', routes);
app.use('/characters', charactersRoutes);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send('Oops, looks like theres no where to go...',));


// Server Config
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;