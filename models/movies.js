const {DataTypes} = require("sequelize");
const sequelize = require('../db.js');

const GeneroModel = require('./genero.js');

const Pelicula = sequelize.define("pelicula", {
  imagen: DataTypes.TEXT,
  titulo: DataTypes.TEXT,
  fecha_creacion: DataTypes.DATEONLY,
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
        min: 1,
        max: 5,
    }
  }
},
{
  timestamps: false,
  tableName:'pelicula',
  freezeTableName: true,
}
);

GeneroModel.belongsToMany(Pelicula, { through: 'MovieGenero' });
Pelicula.belongsToMany(GeneroModel, { through: 'MovieGenero' });

module.exports = Pelicula;