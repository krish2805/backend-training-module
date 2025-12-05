'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      address1: {
        type: Sequelize.STRING,
        allowNull:true,
        
      },
      address2: {
        type: Sequelize.STRING,
        phone_number: Sequelize.STRING,
        allowNull: true ,

      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull:true,
      },

      created_at: {
      allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        

      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,

      },
      deleted_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,

      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};