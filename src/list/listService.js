const listRepository = require('./listRepository');

exports.getAllLists = async function(userId) {
    const lists = await listRepository.getAllLists(userId);
    return lists;
}

exports.getList = async function(listId, userId) {
    const list = await listRepository.getList(listId, userId);
    return list;
}

exports.createList = async function(name, userId) {
    const list = await listRepository.createList({
        name,
        ownerUserId: userId
      });

    return list;
}