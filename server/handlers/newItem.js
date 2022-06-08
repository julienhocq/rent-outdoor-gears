const cloudinary = require("../middlewares/cloudinary");

const newItem = async (req, res) => {
  // req.body will hold the text fields, if there were any

  //req.file is the image file. Path is its path
  console.log("req.file IS", req.file);
  const { path } = req.file;
  console.log("path image is", path);
  const extension = req.file.mimetype;
  const size = req.file.size;
  console.log("extension file is:", extension);

  // Validations - has to be an image with size < 1.2 Mo
  if (
    extension === "image/jpeg" ||
    extension === "image/jpg" ||
    extension === "image/png"
  ) {
  } else {
    console.log("not an IMAGE. Sorry no upload");
    return res
      .status(401)
      .json({
        status: 401,
        message: "unsupported file format, only JPG or PNG",
      });
  }
  if (size > 1200000) {
    console.log("image size too big");
    return res
      .status(401)
      .json({ status: 401, message: "Max image size is 1200 Mo" });
  }
  console.log("its an image and with the right size");

  try {
    await cloudinary.uploader.upload(
      path,
      { upload_preset: "rent-adventures" },
      (error, result) => {
        console.log(result, error);
      }
    );

    console.log("image uploaded on Cloudinary");
    return res
      .status(200)
      .json({ status: 200, data: req.file, message: "image uploaded" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { newItem };
