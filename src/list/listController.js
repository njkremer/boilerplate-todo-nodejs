const { ToDoListError, ToDoErrorTypes } = require('../error/ToDoListError');
const listService = require('./listService');

exports.getAllLists = async function (req, res) {
  try {
    const { id: userId } = req.user;
    const lists = await listService.getAllLists(userId);

    return res.status(200).json({ data: lists });
  }
  catch (e) {
    return ToDoListError.processError(e, res);
  }
}

exports.getList = async function (req, res) {
  try {
    const { listId } = req.params;
    const { id: userId } = req.user;

    const list = await listService.getList(listId, userId);
    if (list) {
      return res.status(200).json({ data: list });
    }
    else {
      throw new ToDoListError(ToDoErrorTypes.LIST_NOT_FOUND);
    }
  }
  catch (e) {
    return ToDoListError.processError(e, res);
  }
}

exports.createList = async function (req, res) {
  try {
    const { name } = req.body;
    const { id: userId } = req.user;

    if (!name) {
      throw new ToDoListError(ToDoErrorTypes.LIST_NAME_REQUIRED);
    }

    const newList = (await listService.createList(name, userId));

    return res.status(200).json({data: newList})
  }
  catch (e) {
    return ToDoListError.processError(e, res);
  }
}

exports.updateList = async function (req, res) {
  try {
    const { name } = req.body;
    const { listId } = req.params;
    const { id: userId } = req.user;

    if (!name) {
      throw new ToDoListError(ToDoErrorTypes.LIST_NAME_REQUIRED);
    }

    const newList = (await listService.updateList(listId, name, userId));
    if (!!newList === false) {
      throw new ToDoListError(ToDoErrorTypes.LIST_NOT_FOUND);
    }

    return res.status(200).json({data: newList})
  }
  catch (e) {
    return ToDoListError.processError(e, res);
  }
}

exports.deleteList = async function (req, res) {
  try {
    const { listId } = req.params;
    const { id: userId } = req.user;

    const wasSuccessful = await listService.deleteList(listId, userId);
    if (wasSuccessful) {
      return res.status(200).json({ message: `Successfully deleted list with id ${listId}` });
    }
    else {
      throw new ToDoListError(ToDoErrorTypes.LIST_NOT_FOUND);
    }
  }
  catch (e) {
    return ToDoListError.processError(e, res);
  }
}