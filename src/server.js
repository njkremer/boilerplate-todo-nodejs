const express = require('express');
const configureSwagger = require('./swagger');

const listRoutes = require('./list/listRoutes');
const usersRoutes = require('./users/usersRoutes');

const app = express();

app.use(express.json());

app.use("/list", listRoutes);
app.use("/users", usersRoutes);

configureSwagger(app);

module.exports = app;

