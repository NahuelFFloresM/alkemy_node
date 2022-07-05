const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize,DataTypes) => {
  
  const Personaje = sequelize.define("personaje", {
    Imagen: DataTypes.TEXT,
    Nombre: DataTypes.TEXT,
    Edad: DataTypes.INTEGER,
    Peso: DataTypes.INTEGER,
    Historia: DataTypes.TEXT,
    Pelis_Asociadas: DataTypes.ARRAY(DataTypes.TEXT)
  },
  {
    timestamps: false,
  });

  (async () => {
    await sequelize.sync({ force: true });
  })();

  return Personaje;

};