const express = require('express');
const auth = require('../middleware/auth');
const apiKey = require ('../middleware/apiKey')
const listItemController = require('./listItemController');

const router = express.Router({mergeParams: true});

router.get('/', apiKey, auth, listItemController.getAllItemsForList);
router.post('/create', apiKey, auth, listItemController.createListItem);
// router.post('/:listId', apiKey, auth, listController.updateList);
// router.delete('/:listId', apiKey, auth, listController.deleteList);
// router.get('/:listId', apiKey, auth, listController.getList);

module.exports = router;