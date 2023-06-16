const jwt = require("jsonwebtoken");
const jwtkey = process.env.JWT_SECRET_KEY;

/**
 * @param {string} _id
 * @return {string}
 */
const createToken = (_id) => {
  return jwt.sign({ _id }, jwtkey, { expiresIn: "1h" });
};

const userToken = (_id) => {
  return jwt.sign({ _id }, jwtkey, { expiresIn: "24h" });
};

/**
 * @param {string} token
 * @return {object}
 */
function tokenCheck(token) {
  if (!token) {
    return { message: "Invalid Token Format" };
  }
  try {
    jwt.verify(token, jwtkey);
    return { message: "Good", ok: true };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { message: "Session Expired" };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return { message: "Invalid Token" };
    }
    return { message: "Internal server Error" };
  }
}

module.exports = { createToken, userToken, tokenCheck };
