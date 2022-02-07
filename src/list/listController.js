const listService = require('./listService');

exports.getAllLists = async function (req, res) {
    try {
        const { id: userId } = req.user;
        const lists = await listService.getAllLists(userId);

        return res.status(200).json({data: lists});
    }
    catch(e) {
        return res.status(500).json({message: "An error occured"});
    }
}

exports.getList = async function(req, res) {
    try {
        const { listId } = req.params;
        const { id: userId } = req.user;

        const list = await listService.getList(listId, userId);
        if (list) {
            return res.status(200).json({ data: list });
        }
        else {
            return res.status(404).json({ message: 'No list found' });
        }
    }
    catch(e) {
        return res.status(500).json({message: "An error occured"});
    }
}

exports.createList = async function (req, res) {
    const { name } = req.body;
    const { id: userId } = req.user;

    if (!name) {
      return res.status(400).send('List name is required');
    }

    const newList = (await listService.createList(name, userId));

    return res.status(200).json({data: newList})
}

exports.updateList = async function (req, res) {
    const { name } = req.body;
    const { listId } = req.params;
    const { id: userId } = req.user;

    if (!name) {
      return res.status(400).send('List name is required');
    }

    const newList = (await listService.updateList(listId, name, userId));

    return res.status(200).json({data: newList})
}

exports.deleteList = async function (req, res) {
    const { listId } = req.params;
    const { id: userId } = req.user;

    const wasSuccessful = await listService.deleteList(listId, userId);
    if (wasSuccessful) {
        return res.status(200).json({message: `Successfully deleted list with id ${listId}`});
    }
    else {
        return res.status(404).json({message: `Could not find list to delete with id ${listId}`});
    }
}