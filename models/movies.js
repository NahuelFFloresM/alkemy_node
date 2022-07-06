// const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize,DataTypes) => {
  
  const Pelicula = sequelize.define("pelicula", {
    Imagen: DataTypes.TEXT,
    Titulo: DataTypes.TEXT,
    Fecha_Creacion: DataTypes.DATEONLY,
    Calificación: {
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
  }
  );

  return Pelicula;

};