const { mongoose } = require("mongoose");
const { connect } = require("../db.js");
const { Book } = require("../models/Book.js");

const bookNormalization = async () => {
  try {
    await connect();
    console.log("Conexión realizada correctamente.");

    const books = await Book.find();
    console.log(`Hemos recuperado ${books.length} libros de la base de datos`);

    // Actualizamos los campos según las reglas de negocio que queramos
    // Podríamos incluso eliminar datos que no sean correctos
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      book.publisher.country = book.publisher.country.toUpperCase();
      await book.save();

      console.log(`Modificado libro ${book.title}`);
    }

    console.log("Modificados todos los libros de nuestra base de datos");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

bookNormalization();
