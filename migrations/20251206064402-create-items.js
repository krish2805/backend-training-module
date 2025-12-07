"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      item_pictures: {
        type: Sequelize.JSONB,      // array of picture URLs
        allowNull: false,
        defaultValue: [],
      },
      length: {
        type: Sequelize.FLOAT,
      },
      breadth: {
        type: Sequelize.FLOAT,
      },
      height: {
        type: Sequelize.FLOAT,
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // unique (item_code, version) for versioning
    await queryInterface.addConstraint("Items", {
      fields: ["item_code", "version"],
      type: "unique",
      name: "unique_item_code_version",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Items");
  },
};
