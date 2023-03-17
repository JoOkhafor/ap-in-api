const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

function Auth(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      message: "No Authorization",
    });
  }
  try {
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Invalid Token Format",
      });
    }
    const decode = jwt.verify(token, SECRET_KEY);
    console.log(decode);
    if (req.body.user === decode._id) return res.status(200).json(decode);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Session Expired",
        error: error.message,
      });
    }
    if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
      return res.status(401).json({
        message: "Invalid Token",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
      stack: error.stack,
    });
  }
}

module.exports = Auth;
