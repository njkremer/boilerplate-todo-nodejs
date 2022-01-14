const listService = require('./listService');

exports.getAllLists = async function (req, res) {
    try {
        const userId = req.user.id;
        const lists = await listService.getAllLists(userId);

        res.status(200).json({data: lists});
    }
    catch(e) {
        return res.status(500).json({message: "An error occured"});
    }
}

exports.createList = async function (req, res) {
    const userId = req.user.email;

    res.status(200).json({data: `get list for ${userId}`})
}

exports.deleteList = async function (req, res) {
    const userId = req.user.email;

    res.status(200).json({data: `get list for ${userId}`})
}

exports.getList = async function(req, res) {
    try {
        const listId = req.params.listId;
        const list = await listService.getList(listId);
        res.status(200).json({ data: list });
    }
    catch(e) {
        return res.status(500).json({message: "An error occured"});
    }
}