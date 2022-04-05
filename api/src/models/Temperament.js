const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("temperament", {
    // id: {
    //   type: DataTypes.STRING,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
