const express = require("express");
const app = express();
const consign = require("consign");
const db = require("./config/db");
const mongoose = require("mongoose");

require("./config/mongodb");

app.db = db;
app.mongoose = mongoose;

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./api/category.js")
  .then("./config/routes.js")
  .into(app);

module.exports = app;
