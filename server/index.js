const express = require("express");
const morgan = require("morgan");

const { getAllItems } = require("./handlers/getAllItems");
const { getItemsByCategory } = require("./handlers/ItemsByCategory");
const { getItemById } = require("./handlers/singleItem");
const { register } = require("./handlers/register");

const { login } = require("./handlers/login");


express()
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  .get("/", (req, res) => {
    res.send("helllo Robertoo");
  })

  //Get all items - by query
  .get("/api/items", getAllItems)

  //Get a specific Item
  .get("/api/item/:itemById", getItemById)

  //Get All item by category
  .get("/api/items/:category", getItemsByCategory)

    // user - register
    .post("/api/owner/register", register)
// user - login
.post("/api/owner/login", login)


  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(7000, () => console.log(`Listening on port 7000`));
