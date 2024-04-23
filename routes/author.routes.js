const express = require("express");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public" });

// Modelos
const { Author } = require("../models/Author.js");
const { Book } = require("../models/Book.js");

// Router propio de Autores
const router = express.Router();

// CRUD: READ - devuelve todos los autores (params opcionales http://localhost:3000/author?page=1&limit=10)
router.get("/", async (req, res, next) => {
  try {
    // Asi leemos query params
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const author = await Author.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // Num total de elementos
    const totalElements = await Author.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: author,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// CRUD: CREATE - crea nuevo autor
router.post("/", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const author = new Author(req.body);
    const createdAuthor = await author.save();
    return res.status(201).json(createdAuthor);
  } catch (error) {
    next(error);
  }
});

// NO CRUD - Busca autor por nombre
router.get("/name/:name", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  const name = req.params.name;

  try {
    const author = await Author.find({ name: new RegExp("^" + name.toLowerCase(), "i") });

    if (author?.length) {
      res.json(author);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: DELETE - Elimina autor
router.delete("/:id", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const id = req.params.id;
    const authorDeleted = await Author.findByIdAndDelete(id);
    if (authorDeleted) {
      res.json(authorDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: UPDATE - modifica autor
router.put("/:id", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const id = req.params.id;
    const authorUpdated = await Author.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (authorUpdated) {
      res.json(authorUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: READ - busca autor por id
router.get("/:id", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const id = req.params.id;
    const author = await Author.findById(id);

    if (author) {
      const temporalAuthor = author.toObject();
      const includeBooks = req.query.includeBooks === "true";
      if (includeBooks) {
        const books = await Book.find({ author: id });
        temporalAuthor.books = books;
      }

      res.json(temporalAuthor);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
});

router.post("/image-upload", upload.single("file"), async (req, res, next) => {
  try {
    // Renombrado de la imagen
    const originalname = req.file?.originalname;
    const path = req.file.path;
    const newPath = path + "_" + originalname;
    fs.renameSync(path, newPath);

    // Busqueda del autor
    const authorId = req.body.authorId;
    const author = await Author.findById(authorId);

    if (author) {
      author.profileImage = newPath;
      await author.save();
      res.json(author);

      console.log("Autor modificado correctamente!");
    } else {
      fs.unlinkSync(newPath);
      res.status(404).send("Autor no encontrado");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { authorRouter: router };
