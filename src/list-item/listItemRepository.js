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

exports.updateList = async (listId, userId, updatedList) => {
  const dbRecord = [updatedList].map(mapListToDb)[0]

  const wasSuccessful = await db('lists')
    .where('id', listId)
    .where('owner_user_id', userId)
    .update(dbRecord) === 1;

  return wasSuccessful;
}

exports.deleteList = async (listId, userId) => {
  const wasSuccessful = await db('lists')
    .where('id', listId)
    .where('owner_user_id', userId)
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