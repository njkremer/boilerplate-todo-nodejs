const db = require('../database');

exports.getAllLists = async function() {
    const rows = await db.select().table('list');
    return rows;
}