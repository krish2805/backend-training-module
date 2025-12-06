



module.exports = ({
    registerUser,
    loginUser,
    getUserById,
    updatePasswordUsecase,
    updateProfileUsecase,
    softDeleteUserCase,
}) => {

    async function register(req, res, next) {
        try {
            const result = await registerUser(req.body);
            return res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    async function login(req, res) {
        try {
            const user = await loginUser(req.body);

            req.session.user = {
                id: user.id,
                email: user.email,
                isAdmin: user.is_admin,
            };

            return res.status(200).json({
                message: "Login successful",
                user: { id: user.id, email: user.email },
            });
        } catch (err) {
            console.error("LOGIN ERROR:", err);
            return res.status(401).json({ error: err.message });
        }
    }

    async function getById(req, res) {
        try {
            const result = await getUserById(req.params.id);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    }

    async function profile(req, res) {
        try {
            if (!req.session.user) {
                return res.status(401).json({ error: "Not authenticated" });
            }
            const result = await getUserById(req.session.user.id);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async function updatePassword(req, res) {
        try {
            if (!req.session.user) {
                return res.status(401).json({ error: "Not authenticated" });
            }

            const { oldPassword, newPassword } = req.body;

            const result = await updatePasswordUsecase({
                userId: req.session.user.id,
                oldPassword,
                newPassword,
            });

            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async function updateProfile(req, res) {
        try {
            if (!req.session.user) {
                return res.status(401).json({ error: "Not authenticated" });
            }
  
             const targetUserId = req.params.id || req.session.user.id;
            const result = await updateProfileUsecase({
                userId: req.session.user.id,
                profileData: req.body,
            });

            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async function softDeleteUser(req, res) {
        try {
            if (!req.session.user) {
                return res.status(401).json({ error: "Not authenticated" });
            }

            const targetUserId = req.params.id || req.session.user.id;

            const result = await softDeleteUserCase({
                userId: req.session.user.id,
            });

            req.session.destroy(() => { });

            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    return {
        register,
        login,
        getById,
        profile,
        updatePassword,
        updateProfile,
        softDeleteUser,
    };
};
