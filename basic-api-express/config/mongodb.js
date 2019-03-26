const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/blog", { useNewUrlParser: true })
  .catch(err => {
    console.log("Não foi possível conectar com o MongoDB.");
  });
