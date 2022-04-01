const db = require('../database');

exports.getAllLists = async function(userId) {
    const rows = await db.select().table('lists').where('ownerUserId', userId);
    return rows;
}

exports.getList = async function(listId, userId) {
    const rows = (await getUserListQuery(listId, userId).select())[0];
    return rows;
}

exports.createList = async function(newList) {
    const createdListId = (await db('lists').insert(newList))[0];

    newList.id = createdListId;

    return newList;
}

exports.updateList = async function(listId, userId, updatedList) {

    await db('lists')
        .where('id', listId)
        .where('ownerUserId', userId)
        .update(updatedList);

    return updatedList;
}

exports.deleteList = async function(listId, userId) {
    return (await db('lists')
        .where('id', listId)
        .where('ownerUserId', userId)
        .del());
}

exports.doesListExistForUser = async function(listId, userId) {
    const listCount = (await getUserListQuery(listId, userId).count('* as count'))[0].count;
    return listCount > 0;
}

function getUserListQuery(listId, userId) {
    return db
    .table('lists')
    .where('id', listId)
    .where('ownerUserId', userId);
}