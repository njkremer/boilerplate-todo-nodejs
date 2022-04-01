const jwt = require("jsonwebtoken");
const usersService = require('../users/usersService');
const listService = require('../list/listService');

const { JWT_TOKEN_KEY } = require('../config');

const verifyToken = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  const splitAuth = authHeader?.split(' ');
  const hasToken = splitAuth?.length === 2 && splitAuth[0] == "Bearer";

  if (hasToken === false) {
    return res.status(401).send("Authorization is required");
  }

  try {
    const token = splitAuth[1];
    const decoded = jwt.verify(token, JWT_TOKEN_KEY);

    const user = await usersService.findUserById(decoded.user_id);
    if (!!user === false) {
      return res.status(401).send("Authorization is required");
    }

    req.user = user;

    const { listId } = req.params;
    if (listId) {
      const userHasAccessToList = await listService.doesUserHaveAccessToList(listId, user.id);
      if (userHasAccessToList === false) {
        return res.status(403).send("You do not have access to the requested resource");
      }
    }

  } catch (err) {
    const isJwtError = err.name === 'JsonWebTokenError' ||
                       err.name === 'NotBeforeError' ||
                       err.name === 'TokenExpiredError';
    if (isJwtError) {
      return res.status(401).send(`Authorization is required`);
    }
    return res.status(500).send(`An unexpected error occured: ${err.message}`);
  }
  return next();
};

module.exports = verifyToken;