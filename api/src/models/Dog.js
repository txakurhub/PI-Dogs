const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  // sequelize.define("dog", {
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   id: {
  //     type: DataTypes.INTEGER,
  //     primaryKey: true,
  //   },
    
  // });
  sequelize.define("breed", {
    id: {
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imgUrl: { 
      type: DataTypes.STRING,
      defaultValue: "https://nupec.com/wp-content/uploads/2020/07/Captura-de-pantalla-2020-07-24-a-las-17.33.44.png"
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });
  
};
//await sequelize.sync({force: true})
// sequelize.sync()