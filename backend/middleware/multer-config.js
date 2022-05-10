const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.split(" ").join("_");
    name = name.replace(/.[^/.]+$/, "");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    // TODO all verifications linked to file must go here (size, exotic characters in file name, file name length)
    if (!MIME_TYPES[file.mimetype]) {
      callback(new Error("Type d'image invalide !"));
    } else {
      callback(null, true);
    }
  },
}).single("image");
