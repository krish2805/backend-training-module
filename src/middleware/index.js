// // // middleware/index.js
// // const authMiddleware = require("./auth_middleware");
// // const adminMiddleware = require("./admin_middleware");
// // const createPermissionMiddleware = require("./permission.user");

// // function createMiddlewares() {
// //   return {
// //     authMiddleware,
// //     adminMiddleware,
// //     createPermissionMiddleware
// //   };
// // }

// // const { User, UserPermission } = require("../../models");
// // const createUserRepo = require("../data-acess/userepo");
// // const createUserPermissionRepo = require("../data-acess/user-permission");

// // function createMiddlewares() {
// //   const userRepo = createUserRepo({ User });
// //   const userPermissionRepo = createUserPermissionRepo({ UserPermission });

  
// //   const { hasPermission } = createPermissionMiddleware({
// //     userRepo,
// //     userPermissionRepo,
// //   });

// // return {
// //     authMiddleware,
// //     adminMiddleware,
// //     hasPermission,
// //   };
// // }

// // module.exports = createMiddlewares;

// // src/middleware/index.js
// const authMiddleware = require("./auth_middleware");
// const adminMiddleware = require("./admin_middleware");
// const createPermissionMiddleware = require("./permission.user");

// const { User, UserPermission } = require("../../models");
// const createUserRepo = require("../data-acess/userepo");
// const createUserPermissionRepo = require("../data-acess/user-permission");

// function createMiddlewares() {
//     const userRepo = createUserRepo({ User });
//     const userPermissionRepo = createUserPermissionRepo({ UserPermission });

//     // permission.user.js must return { hasPermission }
//     const { hasPermission } = createPermissionMiddleware({
//         userRepo,
//         userPermissionRepo,
//     });

//     return {
//         authMiddleware,
//         adminMiddleware,
//         hasPermission,   // 👈 this is what routes need
//     };
// }

// module.exports = createMiddlewares;

// src/middleware/index.js
const authMiddleware = require("./auth_middleware");
const adminMiddleware = require("./admin_middleware");
const createPermissionMiddleware = require("./permission.middleware");

const { UserPermission } = require("../../models");
const createUserPermissionRepo = require("../data-acess/user-permission");

function createMiddlewares() {
    const userPermissionRepo = createUserPermissionRepo({ UserPermission });

    // DI into permission middleware
    const { hasPermission } = createPermissionMiddleware({
        userPermissionRepo,
    });

    return {
        authMiddleware,
        adminMiddleware,
        hasPermission,  // 👈 this is what routes use
    };
}

module.exports = createMiddlewares;
