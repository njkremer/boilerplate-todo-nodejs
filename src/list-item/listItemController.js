const { ToDoListError, ToDoErrorTypes } = require('../error/ToDoListError');
const listItemService = require('./listItemService');

exports.getAllItemsForList = async function (req, res) {
  try {
    const { listId } = req.params;
    const listItems = await listItemService.getAllItemsForList(listId);

    return res.status(200).json({ data: listItems });
  }
  catch (e) {
    return ToDoListError.processError(e, res);
  }
}

exports.createListItem = async function (req, res) {
  try {
    const { description, note, dueDate } = req.body;
    const { listId } = req.params;

    if (!description) {
      throw new ToDoListError(ToDoErrorTypes.LIST_ITEM_DESCRIPTION_REQUIRED);
    }

    const newItem = (await listItemService.createListItem(description, note, dueDate, listId));

    return res.status(200).json({data: newItem})
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