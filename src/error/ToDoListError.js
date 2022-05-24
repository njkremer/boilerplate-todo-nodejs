class ToDoListError extends Error {
  constructor(errorType, customMessage) {
    super(customMessage || errorType.message);
    this.errorNumber = errorType.code;
    this.httpStatus = errorType.httpStatus;
  }

  static processError(err, res) {
    if (err instanceof ToDoListError) {
      const { httpStatus, ...errorResponse } = err;
      errorResponse.message = err.message;

      return res
        .status(httpStatus || 500)
        .json(errorResponse);
    }
    else {
      return res.status(500).send(`An unexpected error occured: ${err.message}`);
    }
  }
}

const errorTypes = {
  LIST_NOT_FOUND: { code: 1000, httpStatus: 404, message: 'No List Found'},
  LIST_NAME_REQUIRED: { code: 1001, httpStatus: 400, message: 'List name is required'},
  LIST_ITEM_DESCRIPTION_REQUIRED: { code: 1002, httpStatus: 400, message: 'List item description is required'},
  LIST_ITEM_NOT_FOUND: { code: 1003, httpStatus: 404, message: 'No List Item Found'}
}

exports.ToDoListError = ToDoListError;
exports.ToDoErrorTypes = errorTypes;