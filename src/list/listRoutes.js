const express = require('express');
const auth = require('../middleware/auth');
const apiKey = require ('../middleware/apiKey')
const listController = require('./listController');

const router = express.Router();

router.get('/all', apiKey, auth, listController.getAllLists);
router.post('/create', apiKey, auth, listController.createList);
router.post('/:listId/delete', apiKey, auth, listController.deleteList);
router.get('/:listId', apiKey, auth, listController.getList);

module.exports = router;