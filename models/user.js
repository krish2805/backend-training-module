'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    created_at: DataTypes.DATE,
    is_deleted: DataTypes.BOOLEAN,
    deleted_by: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
     tableName: "Users",  
    timestamps: true, 
  });
  return User;
};