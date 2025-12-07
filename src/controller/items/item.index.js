
const createItemController = require("./item.controller");

module.exports = ({ itemRepo }) => {
  const itemController = createItemController({ itemRepo });
  return { itemController };
};
