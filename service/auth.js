const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

function setUser(user) {
  return jwt.sign(user.toObject(),secret,{ expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // token expiry
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  }
   catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser
};
