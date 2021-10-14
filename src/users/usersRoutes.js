const express = require('express');

const router = express.Router();

const apiKey = require ('../middleware/apiKey')

const usersController = require('./usersController');

router.post('/register', apiKey, usersController.register);
router.post('/login', apiKey, usersController.login);

module.exports = router;