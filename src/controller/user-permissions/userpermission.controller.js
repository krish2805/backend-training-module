

module.exports = ({
    createUserPermissionUsecase,
    updateUserPermissionUsecase,
}) => {
    async function createUserPermission(req, res) {
        try {
            const {
                user_id,
                module_code,
                can_create,
                can_update,
                can_delete,
                can_view,
            } = req.body;

            const result = await createUserPermissionUsecase({
                userId: user_id,
                moduleCode: module_code,
                canCreate: !!can_create,
                canUpdate: !!can_update,
                canDelete: !!can_delete,
                canView: !!can_view,
            });

            return res.status(201).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async function updateUserPermission(req, res) {
        try {
            const {
                user_id,
                module_code,
                can_create,
                can_update,
                can_delete,
                can_view,
            } = req.body;

            const result = await updateUserPermissionUsecase({
                userId: user_id,
                moduleCode: module_code,
                canCreate: can_create,
                canUpdate: can_update,
                canDelete: can_delete,
                canView: can_view,
            });

            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    return {
        createUserPermission,
        updateUserPermission,
    };
};

