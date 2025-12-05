
module.exports = ({ userRepo }) =>
  async function getUserById(id) {
    const user = await userRepo.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const plainUser = user.toJSON();
    delete plainUser.password;
    return plainUser;
  };
