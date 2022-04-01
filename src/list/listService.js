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
    const updatedList = { name };
    const wasSuccessful = await listRepository.updateList(listId, userId, updatedList);
    if (wasSuccessful) {
        return {
            ...updatedList,
            listId,
            ownerUserId: userId
        };
    }
    return null;
}

exports.createList = async function(name, userId) {
    const list = await listRepository.createList({
        name,
        ownerUserId: userId
      });

    return list;
}

exports.deleteList = async function(listId, userId) {
    const wasSuccessful = await listRepository.deleteList(listId, userId);
    return wasSuccessful;
}

exports.doesUserHaveAccessToList = async function(listId, userId) {
    return await listRepository.doesListExistForUser(listId, userId);
}