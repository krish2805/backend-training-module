// controller/index.js
const createUserController = require("./user.controller");

const createRegisterUser = require("../usecase/user/register");
const createLoginUser = require("../usecase/user/login");
const createGetUserById = require("../usecase/user/getbyid");
const createUpdatePassword = require("../usecase/user/updatepass");
const createUpdateProfile = require("../usecase/user/updateprofile");
const createSoftDeleteUser = require("../usecase/user/softdelete");

function createControllers({ userRepo, hashPassword, comparePassword }) {
  const userController = createUserController({
    registerUser: createRegisterUser({ userRepo, hashPassword }),
    loginUser: createLoginUser({ userRepo, comparePassword }),
    getUserById: createGetUserById({ userRepo }),
    updatePasswordUsecase: createUpdatePassword({ userRepo, hashPassword, comparePassword }),
    updateProfileUsecase: createUpdateProfile({ userRepo }),
    softDeleteUserCase: createSoftDeleteUser({ userRepo }),
  });

  return { userController };
}

module.exports = createControllers;
