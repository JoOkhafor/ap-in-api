const bcrypt = require("bcrypt");

async function encrypt(password) {
  const salt = await bcrypt.genSalt(10);
  const crypted = await bcrypt.hash(password, salt);
  return crypted;
}

async function pwdCompare(oldPwd, newPwd) {
  const result = await bcrypt.compare(oldPwd, newPwd);
  return result;
}

module.exports = { encrypt, pwdCompare };
