const express = require('express');
const auth = require('../middleware/auth');
const apiKey = require ('../middleware/apiKey')
const listItemController = require('./listItemController');

const router = express.Router({mergeParams: true});

router.get('/', apiKey, auth, listItemController.getAllItemsForList);
router.post('/create', apiKey, auth, listItemController.createListItem);
router.post('/:itemId', apiKey, auth, listItemController.updateListItem);
router.delete('/:itemId', apiKey, auth, listItemController.deleteListItem);

module.exports = router;