const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const verifyToken = (token) => {
  try {
    // return jwt.verify(token, JWT_SECRET);
    return jwt.decode(token);
  } catch (err) {
    console.log("invalid token");
    throw new Error('Invalid token');
  }
};

module.exports = { verifyToken };
