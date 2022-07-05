const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize,DataTypes) => {
  
  const Pelicula = sequelize.define("pelicula", {
    Imagen: DataTypes.TEXT,
    Titulo: DataTypes.TEXT,
    Fecha_Creacion: DataTypes.DATEONLY,
    Calificación: DataTypes.RANGE([1,5])
  },
  {
    timestamps: false,
  });

  (async () => {
    await sequelize.sync({ force: true });
  })();

  return Pelicula;

};