'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Medal.init({
    medals_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    medal_img: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Medal',
  });
  return Medal;
};