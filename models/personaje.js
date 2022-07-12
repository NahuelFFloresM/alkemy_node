const {DataTypes} = require("sequelize");
const sequelize = require('../db.js');

const MovieModel = require('./pelicula');
  
const Personaje = sequelize.define("personaje", {
  imagen: DataTypes.TEXT,
  nombre: DataTypes.TEXT,
  edad: DataTypes.INTEGER,
  peso: DataTypes.INTEGER,
  historia: DataTypes.TEXT,
},
{
  timestamps: false,
  tableName: 'personaje',
  freezeTableName: true,
});

Personaje.belongsToMany(MovieModel, { through: 'CharacterMovie' });
MovieModel.belongsToMany(Personaje, { through: 'CharacterMovie' });
  
module.exports = Personaje;