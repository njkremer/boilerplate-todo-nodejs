const express = require('express');

const listRoutes = require('./list/list-routes');
const usersRoutes = require('./users/usersRoutes');

const app = express();

app.use(express.json());

app.use("/list", listRoutes);
app.use("/users", usersRoutes);

module.exports = app;