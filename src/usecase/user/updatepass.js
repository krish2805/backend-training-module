

module.exports = ({ userRepo, hashPassword, comparePassword }) =>
  async function updatePasswordUsecase({ userId, oldPassword, newPassword }) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await comparePassword(oldPassword, user.password);
    if (!isValid) {
      throw new Error("Old password is incorrect");
    }

    const hashedNew = await hashPassword(newPassword);

    const updatedUser = await userRepo.updateById(userId, {
      password: hashedNew,
    });

    const plainUser = updatedUser.toJSON();
    delete plainUser.password;
    return plainUser;
  };
