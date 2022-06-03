const express = require("express");
const app = express()
const morgan = require("morgan");

app.get("/", (req, res) => {
  res.send("helllo Robert");
});

app.listen(8000);
