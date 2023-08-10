'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    address: DataTypes.STRING,
    privatekey: DataTypes.STRING,
    gye_amount: DataTypes.INTEGER,
    usdg_amount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};