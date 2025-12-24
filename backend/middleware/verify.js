exports.verifAuth = (req, res, next) => {
  // console.log(req.session.user);
  const token = req.session.user;
  console.log(token)
  if (!token) {
    return res.json({
      success: false,
      message: "you are not authorize",
    });
  }
  next();
};
