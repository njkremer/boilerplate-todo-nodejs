const listItemRepository = require('./listItemRepository');

exports.getAllItemsForList = async function(listId) {
    const items = await listItemRepository.getAllItemsForList(listId);
    return items;
}

exports.createListItem = async function(description, note, dueDate, listId) {
    const item = await listItemRepository.createListItem({
        description,
        note,
        dueDate,
        listId
    });

    return item;
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

exports.deleteList = async function(listId, userId) {
    const wasSuccessful = await listRepository.deleteList(listId, userId);
    return wasSuccessful;
}