const listRepository = require('./list-repository');

exports.getLists = async function() {
    const lists = await listRepository.getAllLists();
    return lists;
}