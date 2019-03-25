const express = require("express");
const app = express();
const consign = require("consign");
const db = require("./config/db");

app.db = db;

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./api/category.js")
  .then("./config/routes.js")
  .into(app);

module.exports = app;