const listRepository = require('./listRepository');

exports.getAllLists = async function(userId) {
    const lists = await listRepository.getAllLists(userId);
    return lists;
}

exports.getList = async function(listId) {
    const list = (await listRepository.getList(listId))[0];
    return list;
}