// src/crone-job/index.js
const setupUserCron = require("./crone");
const createUserRepo = require("../data-acess/userrepo");
const { User } = require("../../models"); 

module.exports = () => {
  const userRepository = createUserRepo({ User }); 
  setupUserCron({ userRepository });
};
