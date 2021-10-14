const express = require('express');
const auth = require('../middleware/auth');
const apiKey = require ('../middleware/apiKey')
const listController = require('./listController');

const router = express.Router();

router.get('/all', apiKey, auth, listController.getAllLists);
router.get('/get-list', apiKey, auth, listController.getList);

module.exports = router;