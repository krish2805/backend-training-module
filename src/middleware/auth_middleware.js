


module.exports = (req, res, next) => {
  console.log("hello");
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
