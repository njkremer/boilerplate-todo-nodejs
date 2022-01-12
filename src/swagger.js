const express = require('express');
const fs = require("fs")
const path = require('path')
const swaggerUiDist = require("swagger-ui-dist");

const { PORT } = require('./config');

function configureSwagger(app) {
  const pathToSwaggerUi = swaggerUiDist.absolutePath();

  const indexContent = fs.readFileSync(`${pathToSwaggerUi}/index.html`)
    .toString()
    .replace(/http.*swagger\.json/i, `http://localhost:${PORT}/swagger.json`);

    app.get("/", (req, res) => res.send(indexContent));
    app.get("/index.html", (req, res) => res.send(indexContent)); // you need to do this since the line below serves `index.html` at both routes
    app.use(express.static(pathToSwaggerUi));
    app.get('/swagger.json', (req, res) => res.sendFile(path.join(__dirname, '../swagger.json')));
}

module.exports = configureSwagger;