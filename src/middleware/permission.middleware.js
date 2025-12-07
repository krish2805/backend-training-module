
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

