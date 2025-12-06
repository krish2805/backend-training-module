module.exports = ({ User }) => {
    async function createUser(data) {
        return User.create(data);
    }

    async function findByUsername(username) {
        return User.findOne({
            where: {
                username,
                is_deleted: false,
            },
        });
    }

    async function findById(id) {
        return User.findOne({
            where: {
                id,
                is_deleted: false,
            },
        });
    }


    async function updateById(id, updates) {
        await User.update(updates, { where: { id, is_deleted: false } });
        return findById(id);
    }


    async function softDeleteById(id) {
        await User.update(
            { is_deleted: true },
            { where: { id, is_deleted: false } }
        );
        return findById(id);

    }

    async function hardDeleteSoftDeletedUsers() {
        return User.destroy({
            where: {
                is_deleted: true,
            },
        });
    }
    return {
        createUser,
        findByUsername,
        findById,
        updateById,
        softDeleteById,
        hardDeleteSoftDeletedUsers
    };
};
