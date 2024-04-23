const express = require("express");

// Modelos
const { Book } = require("../models/Book.js");

// Router propio de Libros
const router = express.Router();

// CRUD: READ - devuelve todas los libros (params opcionales http://localhost:3000/book?page=1&limit=10)
router.get("/", (req, res, next) => {
  try {
    console.log("Estamos en el middleware /book que comprueba parámetros");

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    if (!isNaN(page) && !isNaN(limit) && page > 0 && limit > 0) {
      req.query.page = page;
      req.query.limit = limit;
      next();
    } else {
      console.log("Parámetros no válidos:");
      console.log(JSON.stringify(req.query));
      res.status(400).json({ error: "Params page or limit are not valid" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    // Asi leemos query params
    const { page, limit } = req.query;
    const book = await Book.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate(["author"]);

    // Num total de elementos
    const totalElements = await Book.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: book,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// CRUD: CREATE - crea nuevo libro
router.post("/", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const book = new Book(req.body);
    const createdBook = await book.save();
    return res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
});

// NO CRUD - Busca libro por titulo
router.get("/title/:title", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  const title = req.params.title;

  try {
    const book = await Book.find({ title: new RegExp("^" + title.toLowerCase(), "i") });

    if (book?.length) {
      res.json(book);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: DELETE - Elimina libro
router.delete("/:id", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const id = req.params.id;
    const bookDeleted = await Book.findByIdAndDelete(id);
    if (bookDeleted) {
      res.json(bookDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: UPDATE - modifica book
router.put("/:id", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const id = req.params.id;
    const bookUpdated = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (bookUpdated) {
      res.json(bookUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: READ - busca libro por id
router.get("/:id", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const id = req.params.id;
    const book = await Book.findById(id).populate(["author"]);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { bookRouter: router };
