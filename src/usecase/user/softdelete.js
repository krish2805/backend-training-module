

module.exports = ({ userRepo }) =>
  async function softDeleteUserCase({ userId }) {
    await userRepo.softDeleteById(userId);
    return { message: "User soft deleted successfully" };
  };
