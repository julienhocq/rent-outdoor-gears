const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config({ path: "../.env" });

//Setting configuration paramaters globally

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


// exports.uploads = (file, folder) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         ressource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };

module.exports = cloudinary;
