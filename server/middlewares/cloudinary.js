const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config({ path: "../.env" });

//Setting Cloudinary configuration parameters globally
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = cloudinary;
