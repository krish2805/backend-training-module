const { Item } = require("../../models");
const { Op } = require("sequelize");

module.exports = () => {
    const create = (data) => Item.create(data);

    const findLatestByCode = (item_code) =>
        Item.findOne({
            where: { item_code },
            order: [["version", "DESC"]],
        });

    const findAllVersions = (item_code) =>
        Item.findAll({
            where: { item_code },
            order: [["version", "DESC"]],
        });

    return {
        create,
        findLatestByCode,
        findAllVersions,
    };
};
