const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
// });


// const storage = multer.diskStorage({});
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
module.exports = { upload };

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb({ message: "unsupported file format, only JPG or PNG" }, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 },
//   fileFilter: fileFilter,
// });

// module.exports = { upload };
