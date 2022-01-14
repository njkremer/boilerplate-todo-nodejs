const db = require('../database');

exports.getAllLists = async function(userId) {
    const rows = await db.select().table('lists').where('ownerUserId', userId);
    return rows;
}

exports.getList = async function(listId) {
    const rows = await db.select().table('lists').where('id', listId);
    return rows;
}