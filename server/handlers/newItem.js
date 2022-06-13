const cloudinary = require("../middlewares/cloudinary");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const newItem = async (req, res) => {
  // req.body hold the text fields
  const {
    category,
    name,
    description,
    priceDaily,
    priceWeekly,
    city,
    OwnerId,
    longitude,
    latitude,
    image,
  } = req.body;
  //req.file is the image file. Path is its path
  const { path } = req.file;
  const extension = req.file.mimetype;
  const size = req.file.size;

  // Image validations - has to be an image with size < 1.2 Mo
  if (
    extension === "image/jpeg" ||
    extension === "image/jpg" ||
    extension === "image/png"
  ) {
  } else {
    console.log("not an IMAGE. Sorry no upload");
    return res.status(401).json({
      status: 401,
      message: "unsupported file format, only JPG or PNG",
    });
  }
  if (size > 1200000) {
    // console.log("image size too big");
    return res
      .status(401)
      .json({ status: 401, message: "Max image size should be < 1200 Mo" });
  }
  //   console.log("its an image and with the right size");

  const client = new MongoClient(MONGO_URI, options);
  try {
    // MongoDb connection
    await client.connect();
    console.log("Connected!");
    const db = client.db("RentOutdoorGears");

    //Upload the image to the Cloudinary service
    const uploadedImage = await cloudinary.uploader.upload(
      path,
      { upload_preset: "rent-adventures" }
      // (error, uploadedImage) => {
      //   console.log(uploadedImage, error);
      // }
    );
    console.log("image is uploaded on Cloudinary");
    // console.log("url IS", uploadedImage.url);
    // If the image is uploaded, let's create a new item in MongoDb
    if (uploadedImage) {
      const item = {
        category,
        name,
        description,
        priceDaily,
        priceWeekly,
        image: uploadedImage.secure_url,
        isAvailable: true,
        OwnerId,
        city,
        latitude,
        longitude,
      };
      // console.log("item is", item);
      const newItem = Object.assign({ _id: uuidv4() }, item);
      await db.collection("products").insertOne(newItem);
      res.status(200).json({
        status: 200,
        data: newItem,
        message: "Success! New Item created",
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = { newItem };
