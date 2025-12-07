"use strict";

module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
        "Item",
        {
            item_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            item_pictures: {
                type: DataTypes.JSONB,
                allowNull: false,
                defaultValue: [],
            },
            length: {
                type: DataTypes.FLOAT,
            },
            breadth: {
                type: DataTypes.FLOAT,
            },
            height: {
                type: DataTypes.FLOAT,
            },
            version: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_by: {
                type: DataTypes.STRING,
            },
            created_at: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: "Items",
        }
    );

    Item.associate = function (models) {
       
    };

    return Item;
};
