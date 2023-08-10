'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupUserJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GroupUserJoin.init({
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    month: DataTypes.DATE,
    yes_no_fee_payment:DataTypes.STRING,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'GroupUserJoin',
  });
  return GroupUserJoin;
};