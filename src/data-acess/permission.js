module.exports = ({ Permission }) => {
    async function createPermission({ moduleCode, moduleDescription, isActive = true, createdBy }) {
        return Permission.create({
            module_code: moduleCode,
            module_description: moduleDescription,
            is_active: isActive,
            created_by: createdBy,

        });
    }

    async function updatePermission({ id, moduleCode, moduleDescription, isActive }) {
        const [count, [updated]] = await Permission.update(
            {
                module_code: moduleCode,
                module_description: moduleDescription,
                is_active: isActive,
            },
            {
                where: { id },
                returning: true,
            }
        );

        if (count === 0) {
            throw new Error("Permission module not found");
        }

        return updated;
    }


    async function deletePermission({ id }) {
        const count = await Permission.destroy({ where: { id } });
        if (count === 0) {
            throw new Error("Permission module not found");
        }
        return { deleted: true };
    }

    async function findById(id) {
        return Permission.findByPk(id);
    }

    return {
        createPermission,
        updatePermission,
        deletePermission,
        findById,
    };
};
