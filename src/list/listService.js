const listRepository = require('./listRepository');

exports.getLists = async function() {
    const lists = await listRepository.getAllLists();
    return lists;
}