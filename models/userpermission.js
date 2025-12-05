'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserPermission.init({
    user_id: DataTypes.INTEGER,
    module_code: DataTypes.STRING,
    can_create: DataTypes.BOOLEAN,
    can_update: DataTypes.BOOLEAN,
    can_delete: DataTypes.BOOLEAN,
    can_view: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserPermission',
  });
  return UserPermission;
};