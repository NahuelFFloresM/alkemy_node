const {DataTypes} = require("sequelize");
const sequelize = require('../db.js');

const Genero = sequelize.define("genero", {
  nombre: DataTypes.TEXT,
  imagen: DataTypes.TEXT,
},
{
  timestamps: false,
  tableName:'genero',
  freezeTableName: true,
}
);

module.exports = Genero;