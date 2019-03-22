const express = require("express");
const app = express();
const port = 3000;
const consign = require("consign");
const db = require("./config/db");

app.db = db;

consign()
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api/auth.js")
  .then("./api/user.js")
  .then("./api/category.js")
  .then("./config/routes.js")
  .into(app);

app.listen(port, () => console.log("Listening on port " + port));
