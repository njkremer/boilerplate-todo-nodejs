const db = require('../database');

exports.getAllLists = async (userId) => {
  const rows = await db.select().table('lists').where('owner_user_id', userId);
  return rows.map(mapListFromDb);
}

exports.getList = async function(listId, userId) {
  const rows = (await getUserListQuery(listId, userId).select())[0];
  return [rows].map(mapListFromDb)[0];
}

exports.createList = async (newList) => {
  const dbRecord = [newList].map(mapListToDb)[0]

  const createdListId = (await db('lists').insert(dbRecord))[0];

  newList.id = createdListId;

  return newList;
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

exports.doesListExistForUser = async (listId, userId) => {
  const listCount = (await getUserListQuery(listId, userId).count('* as count'))[0].count;
  return listCount > 0;
}

const getUserListQuery = (listId, userId) => {
  return db
    .table('lists')
    .where('id', listId)
    .where('owner_user_id', userId);
}

const mapListFromDb = (listFromDb) => {
  if (listFromDb) {
    const { id, name, owner_user_id } = listFromDb;

    return {
        id,
        name,
        ownerUserId: owner_user_id
    };
  }
}

const mapListToDb = (list) => {
  if (list) {
    const { id, name, ownerUserId } = list;

    return {
        id,
        name,
        owner_user_id: ownerUserId
    };
  }
}