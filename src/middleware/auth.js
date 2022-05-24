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

        // Returning 404 instead of a 403 here because for all intents and purposes, the list doesn't
        // exist. It may or may not ACTUALLY exist, but to the user, if they don't own it, it doesn't
        // exist. See https://apihandyman.io/hands-off-that-resource-http-status-code-401-vs-403-vs-404/
        // for more detail
        return res.status(404).send("The requested resource does not exist");
      }
    }

  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send(`Authorization is required`);
    }
    return res.status(500).send(`An unexpected error occured: ${err.message}`);
  }
  return next();
};

module.exports = verifyToken;