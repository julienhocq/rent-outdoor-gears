const express = require("express");
const morgan = require("morgan");
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const { getAllItems } = require("./handlers/getAllItems");
const { getItemsByCategory } = require("./handlers/ItemsByCategory");
const { getItemById } = require("./handlers/singleItem");
const { register } = require("./handlers/register");
const {getOwnerById} = require("./handlers/singleOwner")
const {postItem} = require("./handlers/postItem")

const cloudinary = require('./middlewares/cloudinary')
const fs = require('fs')
const upload = require('./middlewares/multer')
// const {postImages} = require('./handlers/postImages')

const { login } = require("./handlers/login");

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

  .post("/api/item", postItem)

  // .use("/upload-images", upload.array("image"), async (req, res) => {

  //   const uploader = async (path) => await cloudinary.uploads(path, 'Images')

  //   if(req.method === 'POST') {
  //     const urls = []
  //     const files = req.files;
  //       for(const file of files) {
  //           const {path} = file;
  //           const newPath = await uploader(path)
  //           urls.push(newPath)
  //           fs.unlinkSync(path)
  //       }
     
  //   res.status(200).json({
  //       message: 'Success! images are uploaded',
  //       data: urls
  //   })
  //   } else {
  //       res.status(400).json({
  //           err: `${req.method} method not allowed`
  //       })
  //   }
  // })

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(7000, () => console.log(`Listening on port 7000`));
