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

exports.updateListItem = async function(itemId, description, note, dueDate, listId) {
    const updatedListItem = {
        description,
        note,
        dueDate
    };
    const wasSuccessful = await listItemRepository.updateListItem(itemId, listId, updatedListItem);
    if (wasSuccessful) {
        return {
            ...updatedListItem,
            listId,
            id: itemId
        };
    }
    return null;
}

exports.deleteListItem = async function(listId, itemId) {
    const wasSuccessful = await listItemRepository.deleteListItem(listId, itemId);
    return wasSuccessful;
}