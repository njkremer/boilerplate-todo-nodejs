const express = require('express');
const dotenv = require('dotenv');

const listRoutes = require('./list/list-routes');

const app = express();

dotenv.config();

app.use("/list", listRoutes);

module.exports = app;