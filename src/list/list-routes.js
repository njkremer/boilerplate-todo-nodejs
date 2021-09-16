const express = require('express');
const auth = require('../middleware/auth');
const listController = require('./list-controller');

const router = express.Router();

router.get('/all', auth, listController.getAllLists);
router.get('/get-list', auth, listController.getList);

module.exports = router;