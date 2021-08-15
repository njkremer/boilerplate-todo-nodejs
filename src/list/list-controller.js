const listService = require('./list-service');

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