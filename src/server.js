const express = require('express');
const configureSwagger = require('./swagger');

const listRoutes = require('./list/listRoutes');
const usersRoutes = require('./users/usersRoutes');
const listItemRoutes = require('./list-item/listItemRoutes');

const app = express();

app.use(express.json());

app.use("/list", listRoutes);
app.use("/users", usersRoutes);
app.use("/items", listItemRoutes);

configureSwagger(app);

module.exports = app;

