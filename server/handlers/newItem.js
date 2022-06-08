const cloudinary = require("../middlewares/cloudinary")

const newItem = async (req, res) => {
  // req.body will hold the text fields, if there were any
  console.log("req.body is:", req.body);

  //req.file is the image file. Path is its path
  const {path} = req.file
  console.log('path image is', path);
 

  try {
    await cloudinary.uploader.upload(
        path,
        { upload_preset: "rent-adventures" },
        (error, result) => {
          console.log(result, error);
        }
        );
        
      console.log('image uploaded on Cloudinary');
    return   res.status(200).json({ status: 200, data: req.file, message: "image uploaded" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
}
}

module.exports = { newItem }
