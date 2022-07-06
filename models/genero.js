module.exports = (sequelize,DataTypes) => {
  
  const Genero = sequelize.define("genero", {
    Nombre: DataTypes.TEXT,
    Imagen: DataTypes.TEXT,
  },
  {
    timestamps: false,
  }
  );

  return Genero;

};