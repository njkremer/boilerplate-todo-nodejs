const express = require('express');

const router = express.Router();

const listController = require('./list-controller');

router.get('/get-list', listController.getList);

module.exports = router;