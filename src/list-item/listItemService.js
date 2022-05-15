const listItemRepository = require('./listItemRepository');

exports.getAllItemsForList = async function(listId) {
    const items = await listItemRepository.getAllItemsForList(listId);
    return items;
}