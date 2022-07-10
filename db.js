const Sequelize = require("sequelize");


// Database Connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
     host: process.env.DB_HOST,
     dialect:process.env.DB_DIALECT
});

/**
 * Testing Connection
//  */
 try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// // Modelos
// const CharModel = require('./models/personaje');
// const MovieModel = require('./models/movies');
// const GeneroModel = require('./models/genero');


// // Relacion de tablas
// CharModel.belongsToMany(MovieModel, { through: 'CharacterMovie' });
// MovieModel.belongsToMany(CharModel, { through: 'CharacterMovie' });
// GeneroModel.belongsToMany(MovieModel, { through: 'MovieGenero' });
// MovieModel.belongsToMany(GeneroModel, { through: 'MovieGenero' });

// Syncronizacion con la base de datos segun Documentacion de Sequelize
// sequelize.sync({force:false});

module.exports = sequelize;