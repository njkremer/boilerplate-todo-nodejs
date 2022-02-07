const listRepository = require('./listRepository');

exports.getAllLists = async function(userId) {
    const lists = await listRepository.getAllLists(userId);
    return lists;
}

exports.getList = async function(listId, userId) {
    const list = await listRepository.getList(listId, userId);
    return list;
}

exports.updateList = async function(listId, name, userId) {
    const list = await listRepository.updateList(listId, userId, {
        name
      });

    return {
        ...list,
        listId,
        ownerUserId: userId
    };
}

exports.createList = async function(name, userId) {
    const list = await listRepository.createList({
        name,
        ownerUserId: userId
      });

    return list;
}

exports.deleteList = async function(listId, userId) {
    const wasSuccessful = (await listRepository.deleteList(listId, userId)) === 1;
    return wasSuccessful;
}