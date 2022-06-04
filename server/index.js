const express = require("express");
const morgan = require("morgan");

const { getAllItems } = require("./handlers/getAllItems");
const { getItemsByCategory } = require("./handlers/ItemsByCategory");

express()
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  .get("/", (req, res) => {
    res.send("helllo Robertoo");
  })

  //Get all items
  .get("/api/items", getAllItems)

  //Get a specific Item
  // .get("api/item/:itemById", getItemById)

  //Get All item by category
  .get("/api/:itemsByCategory", getItemsByCategory)



  
  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(7000, () => console.log(`Listening on port 7000`));
