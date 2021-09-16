const listService = require('./list-service');

exports.getAllLists = async function (req, res) {
    const userId = req.user.user_id;

    res.status(200).json({data: `get list for ${userId}`})
}

exports.getList = async function(req, res) {
    try {
        const listId = req.listId || 1;
        const list = await listService.getLists();
        res.status(200).json({ data: list });
    }
    catch(e) {
        return res.status(500).json({message: "An error occured"});
    }
}