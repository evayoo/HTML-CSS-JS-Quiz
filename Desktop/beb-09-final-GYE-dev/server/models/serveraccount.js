'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServerAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServerAccount.init({
    address: DataTypes.STRING,
    privatekey: DataTypes.STRING,
    gye_amount: DataTypes.INTEGER,
    usdg_amount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ServerAccount',
  });
  return ServerAccount;
};