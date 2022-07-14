const {DataTypes} = require("sequelize");
const sequelize = require('../db.js');

  
const Usuario = sequelize.define("usuario", {
  nombre: DataTypes.TEXT,
  apellido: DataTypes.TEXT,
  contrasena: DataTypes.TEXT,
  email: DataTypes.TEXT,
},
{
  timestamps: false,
  tableName: 'usuario',
  freezeTableName: true,
});

  
module.exports = Usuario;