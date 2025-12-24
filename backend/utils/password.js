const bcrypt = require("bcryptjs")
exports.plainToHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.hasToPlain = async (password, hash_password) => {
  return await bcrypt.compare(password, hash_password);
};
