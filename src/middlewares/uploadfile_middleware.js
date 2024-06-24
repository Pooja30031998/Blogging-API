import multer from "multer";
import path from "path";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const correctPath = path.join(path.resolve(), "image_uploads");
    cb(null, correctPath);
  },
  filename: (req, file, cb) => {
    const fileName =
      new Date().toISOString().replace(/:/g, "_") + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const fileUpload = multer({ storage: storageConfig });
