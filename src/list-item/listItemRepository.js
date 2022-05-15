const db = require('../database');

exports.getAllItemsForList = async (listId) => {
  const rows = await db.select().table('list_items').where('list_id', listId);
  return rows.map(mapListItemFromDb);
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