// src/controller/permission.controller.js

module.exports = ({
    createPermissionUsecase,
    updatePermissionUsecase,
    deletePermissionUsecase,
}) => {
    async function createModule(req, res) {
        try {
            const { module_code, module_description, is_active } = req.body;

            const createdBy = req.session?.user?.id || null; // or req.user.id if you use JWT

            const result = await createPermissionUsecase({
                moduleCode: module_code,
                moduleDescription: module_description,
                isActive: is_active ?? true,
                createdBy,
            });

            return res.status(201).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async function updateModule(req, res) {
        try {
            const { id } = req.params;
            const { module_code, module_description, is_active } = req.body;

            const result = await updatePermissionUsecase({
                id,
                moduleCode: module_code,
                moduleDescription: module_description,
                isActive: is_active,
            });

            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async function deleteModule(req, res) {
        try {
            const { id } = req.params;

            const result = await deletePermissionUsecase({ id });

            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    return {
        createModule,
        updateModule,
        deleteModule,
    };
};
