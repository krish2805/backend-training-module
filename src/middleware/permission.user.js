

// // const ACTION_COLUMN_MAP = {
// //     create: "can_create",
// //     update: "can_update",
// //     delete: "can_delete",
// //     view: "can_view",
// // };

// // module.exports = ({ userRepo, userPermissionRepo }) => {
// //     function hasPermission(moduleCode, action) {
// //         const column = ACTION_COLUMN_MAP[action];

// //         return async (req, res, next) => {
// //             try {
// //                 const userId = req.session?.userId; 
// //                 if (!userId) {
// //                     return res.status(401).json({ error: "Login required" });
// //                 }

// //                 const user = await userRepo.findById(userId);
// //                 if (!user) {
// //                     return res.status(404).json({ error: "User not found" });
// //                 }

            
// //                 if (user.is_admin) return next();

// //                 const perm = await userPermissionRepo.getPermission(userId, moduleCode);
// //                 if (!perm) {
// //                     return res
// //                         .status(403)
// //                         .json({ error: "Permissions not configured for this module" });
// //                 }

// //                 if (!column) {
// //                     return res
// //                         .status(500)
// //                         .json({ error: "Invalid permission action setup" });
// //                 }

// //                 if (!perm[column]) {
// //                     return res
// //                         .status(403)
// //                         .json({ error: `Access denied. Missing ${column} permission.` });
// //                 }

// //                 // ✅ OK
// //                 next();
// //             } catch (e) {
// //                 res.status(500).json({ error: e.message });
// //             }
// //         };
// //     }

// //     return { hasPermission };
// // };



// // src/middleware/permission.user.js

// const ACTION_COLUMN_MAP = {
//     create: "can_create",
//     update: "can_update",
//     delete: "can_delete",
//     view: "can_view",
// };

// module.exports = ({ userRepo, userPermissionRepo }) => {
//     function hasPermission(moduleCode, action) {
//         const column = ACTION_COLUMN_MAP[action];

//         return async (req, res, next) => {
//             try {
//                 const userSession = req.session?.user;
//                 if (!userSession) {
//                     return res.status(401).json({ error: "Login required" });
//                 }

//                 const user = await userRepo.findById(userSession.id);
//                 if (!user) {
//                     return res.status(404).json({ error: "User not found" });
//                 }

//                 // admin → full access
//                 if (user.is_admin) return next();

//                 const perm = await userPermissionRepo.getPermission(
//                     user.id,
//                     moduleCode
//                 );

//                 if (!perm) {
//                     return res
//                         .status(403)
//                         .json({ error: "Permissions not configured for this module" });
//                 }

//                 if (!column) {
//                     return res
//                         .status(500)
//                         .json({ error: "Invalid permission action setup" });
//                 }

//                 if (!perm[column]) {
//                     return res
//                         .status(403)
//                         .json({ error: `Access denied. Missing ${column} permission.` });
//                 }

//                 next();
//             } catch (e) {
//                 return res.status(500).json({ error: e.message });
//             }
//         };
//     }

//     return { hasPermission };
// };


// src/middleware/permission.user.js

const ACTION_COLUMN_MAP = {
    create: "can_create",
    update: "can_update",
    delete: "can_delete",
    view: "can_view",
};

module.exports = ({ userPermissionRepo }) => {
    function hasPermission(moduleCode, action) {
        const column = ACTION_COLUMN_MAP[action];

        return async (req, res, next) => {
            try {
                const sessionUser = req.session?.user;
                if (!sessionUser) {
                    return res.status(401).json({ error: "Login required" });
                }

                // 🔓 admin bypass using session flag
                if (sessionUser.isAdmin === true) {
                    return next();
                }

                if (!column) {
                    return res
                        .status(500)
                        .json({ error: "Invalid permission action setup" });
                }

                const perm = await userPermissionRepo.getPermission(
                    sessionUser.id,
                    moduleCode
                );

                if (!perm) {
                    return res
                        .status(403)
                        .json({ error: "Permissions not configured for this module" });
                }

                if (!perm[column]) {
                    return res
                        .status(403)
                        .json({ error: `Access denied: missing ${column} permission.` });
                }

                next();
            } catch (e) {
                return res.status(500).json({ error: e.message });
            }
        };
    }

    return { hasPermission };
};

