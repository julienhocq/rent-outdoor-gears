const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
// const upload = multer({ dest: 'uploads/' })

const { getAllItems } = require("./handlers/getAllItems");
const { getItemsByCategory } = require("./handlers/ItemsByCategory");
const { getItemById } = require("./handlers/singleItem");
const { register } = require("./handlers/register");
const { getOwnerById } = require("./handlers/singleOwner");
// const { postItem } = require("./handlers/postItem");
const { newItem } = require("./handlers/newItem");

const cloudinary = require("./middlewares/cloudinary");

const { login } = require("./handlers/login");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
// });

// const upload = multer({
//   storage: storage,
// });

const upload = multer({ dest: 'uploads/' })

express()
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // .get("/", (req, res) => {
  //   res.send("helllo Robertoo");
  // })

  //Get all items - by query
  .get("/api/items", getAllItems)

  //Get a specific Item
  .get("/api/item/:itemById", getItemById)

  //Get All item by category
  .get("/api/items/:category", getItemsByCategory)

  //Get owner by its Id
  .get("/api/profile/:profileById", getOwnerById)

  // user - register
  .post("/api/owner/register", register)
  // user - login
  .post("/api/owner/login", login)

  // .post("/api/item", postItem)

  //POST an image
  .post("/upload", upload.single("image"), newItem)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(7000, () => console.log(`Listening on port 7000`));
