module.exports = ({ userRepo, hashPassword }) => {
  return async ({ username, password, address1, address2, phone_number, is_admin }) => {
    if (!username || !password) {
      throw new Error("Username & password are required");
    }

    const hashed = await hashPassword(password);

    return userRepo.createUser({
      username,
      password: hashed,
      address1,
      address2,
      phone_number,
      is_admin: is_admin || false,
      created_at: new Date(),
    });
  };
};
