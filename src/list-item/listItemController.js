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

    const newItem = (await listItemService.createListItem(description, note, dueDate, +listId));

    return res.status(200).json({data: newItem})
  }
  catch (e) {
    return ToDoListError.processError(e, res);
  }
}

exports.updateListItem = async function (req, res) {
  try {
    const { description, note, dueDate } = req.body;
    const { listId, itemId } = req.params;

    if (!description) {
      throw new ToDoListError(ToDoErrorTypes.LIST_ITEM_DESCRIPTION_REQUIRED);
    }

    const updatedListItem = (await listItemService.updateListItem(itemId, description, note, dueDate, listId));
    if (!!updatedListItem === false) {
      throw new ToDoListError(ToDoErrorTypes.LIST_ITEM_NOT_FOUND);
    }

    return res.status(200).json({data: updatedListItem})
  }
  catch (e) {
    return ToDoListError.processError(e, res);
  }
}

exports.deleteListItem = async function (req, res) {
  try {
    const { listId, itemId } = req.params;

    const wasSuccessful = await listItemService.deleteListItem(listId, itemId);
    if (wasSuccessful) {
      return res.status(200).json({ message: `Successfully deleted list item with id ${itemId} for list with id ${listId}` });
    }
    else {
      throw new ToDoListError(ToDoErrorTypes.LIST_ITEM_NOT_FOUND);
    }
  }
  catch (e) {
    return ToDoListError.processError(e, res);
  }
}