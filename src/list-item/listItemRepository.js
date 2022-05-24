const db = require('../database');

exports.getAllItemsForList = async (listId) => {
  const rows = await db.select().table('list_items').where('list_id', listId);
  return rows.map(mapListItemFromDb);
}


exports.createListItem = async (newItem) => {
  const dbRecord = [newItem].map(mapListItemToDb)[0]

  const createdListItemId = (await db('list_items').insert(dbRecord))[0];

  newItem.id = createdListItemId;

  return newItem;
}

exports.updateListItem = async (itemId, listId, updatedListItem) => {
  const dbRecord = [updatedListItem].map(mapListItemToDb)[0]

  const wasSuccessful = await db('list_items')
    .where('id', itemId)
    .where('list_id', listId)
    .update(dbRecord) === 1;

  return wasSuccessful;
}

exports.deleteListItem = async (listId, itemId) => {
  const wasSuccessful = await db('list_items')
    .where('id', itemId)
    .where('list_id', listId)
    .del() === 1;

  return wasSuccessful;
}

const mapListItemFromDb = (listItemFromDb) => {
  if (listItemFromDb) {
    const { id, description, note, due_date, list_id } = listItemFromDb;

    return {
        id,
        description,
        note,
        dueDate: due_date,
        listId: list_id
    };
  }
}

const mapListItemToDb = (listItem) => {
  if (listItem) {
    const { id, description, note, dueDate, listId } = listItem;

    return {
        id,
        description,
        note,
        due_date: dueDate,
        list_id: listId
    };
  }
}