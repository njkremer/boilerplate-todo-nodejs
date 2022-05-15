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