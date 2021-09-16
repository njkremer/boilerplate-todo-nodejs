const jwt = require("jsonwebtoken");
const usersService = require('../users/usersService');

const { JWT_TOKEN_KEY } = require('../config');

const verifyToken = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  const splitAuth = authHeader?.split(' ');
  const hasToken = splitAuth.length === 2 && splitAuth[0] == "Bearer";

  if (hasToken === false) {
    return res.status(403).send("Authorization is required");
  }
  try {
    const token = splitAuth[1];
    const decoded = jwt.verify(token, JWT_TOKEN_KEY);

    const user = await usersService.findUserById(decoded.user_id);

    req.user = user;
  } catch (err) {
    return res.status(401).send("Invalid Authorization");
  }
  return next();
};

module.exports = verifyToken;