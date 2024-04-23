const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const upload = multer({ dest: "public" });

router.post("/", upload.single("file"), (req, res, next) => {
  console.log(req);
  try {
    const originalname = req.file.originalname;
    const path = req.file.path;

    const newPath = path + "_" + originalname;

    console.log("Path generado por multer: " + path);
    console.log("Nuevo path: " + newPath);

    fs.renameSync(path, newPath);

    res.send("Fichero subido correctamente!");
    console.log("Fichero subido correctamente!");
  } catch (error) {
    next(error);
  }
});

module.exports = { fileUploadRouter: router };
