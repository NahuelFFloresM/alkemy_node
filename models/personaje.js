module.exports = (sequelize,DataTypes) => {
  
  const Personaje = sequelize.define("personaje", {
    Imagen: DataTypes.TEXT,
    Nombre: DataTypes.TEXT,
    Edad: DataTypes.INTEGER,
    Peso: DataTypes.INTEGER,
    Historia: DataTypes.TEXT,
  },
  {
    timestamps: false,
  });
  
  return Personaje;

};