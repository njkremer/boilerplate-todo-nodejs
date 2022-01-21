const listService = require('./listService');

exports.getAllLists = async function (req, res) {
    try {
        const userId = req.user.id;
        const lists = await listService.getAllLists(userId);

        return res.status(200).json({data: lists});
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

exports.deleteList = async function (req, res) {
    const userId = req.user.id;

    return res.status(200).json({data: `get list for ${userId}`})
}

exports.getList = async function(req, res) {
    try {
        const listId = req.params.listId;
        const userId = req.user.id;

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