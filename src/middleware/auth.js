const { ToDoListError, ToDoErrorTypes } = require('../error/ToDoListError');
const jwt = require("jsonwebtoken");
const usersService = require('../users/usersService');
const listService = require('../list/listService');

const { JWT_TOKEN_KEY } = require('../config');

const verifyToken = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
    const splitAuth = authHeader?.split(' ');
    const hasToken = splitAuth?.length === 2 && splitAuth[0] == "Bearer";

    if (hasToken === false) {
      throw new ToDoListError(ToDoErrorTypes.UNAUTHORIZED);
    }

    const token = splitAuth[1];
    const decoded = jwt.verify(token, JWT_TOKEN_KEY);

    const user = await usersService.findUserById(decoded.user_id);
    if (!!user === false) {
      throw new ToDoListError(ToDoErrorTypes.UNAUTHORIZED);
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
        throw new ToDoListError(ToDoErrorTypes.LIST_NOT_FOUND);
      }
    }

  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return ToDoListError.processError(new ToDoListError(ToDoErrorTypes.UNAUTHORIZED), res);
    }
    return ToDoListError.processError(err, res);
  }
  return next();
};

module.exports = verifyToken;