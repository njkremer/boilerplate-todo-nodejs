const listService = require('./listService');

exports.getAllLists = async function (req, res) {
    const userId = req.user.email;

    res.status(200).json({data: `get list for ${userId}`})
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
        //const list = await listService.getLists();
        res.status(200).json({ data: listId });
    }
    catch(e) {
        return res.status(500).json({message: "An error occured"});
    }
}