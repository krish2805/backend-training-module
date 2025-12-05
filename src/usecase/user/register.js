
module.exports = ({ userRepo, hashPassword }) =>
  async function registerUser(data) {
    const hashed = await hashPassword(data.password);

    const user = await userRepo.createUser({
      username: data.username,
      password: hashed,
      address1: data.address1 || null,
      address2: data.address2 || null,
      phone_number: data.phone_number || null,
      is_deleted: false,
      is_admin: false,
      created_at: new Date(),
    });

    const plainUser = user.toJSON();
    delete plainUser.password;
    return plainUser;
  };
