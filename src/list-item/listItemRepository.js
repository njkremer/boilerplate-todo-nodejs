const db = require('../database');

exports.getAllLists = async (listId) => {
  const rows = await db.select().table('list_items').where('list_id', listId);
  return rows.map(mapListItemFromDb);
}


const mapListItemFromDb = (listItemFromDb) => {
  if (listItemFromDb) {
    const { id, description, note, due_date } = listItemFromDb;

    return {
        id,
        description,
        note,
        dueDate: due_date
    };
  }
}

const mapListItemToDb = (listItem) => {
  if (listItem) {
    const { id, description, note, dueDate } = listItem;

    return {
        id,
        description,
        note,
        due_date: dueDate
    };
  }
}