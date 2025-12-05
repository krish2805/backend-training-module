
module.exports = ({ userRepo, comparePassword }) =>
async function loginUser(data) {
    const user = await userRepo.findByUsername(data.username);
    if (!user) {
    throw new Error("Invalid username or password");
    }

    const isValid = await comparePassword(data.password, user.password);
    if (!isValid) {
      throw new Error("Invalid username or password");
    }

    const plainUser = user.toJSON();
    delete plainUser.password;
    return plainUser;
  };
