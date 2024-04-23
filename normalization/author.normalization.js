const { mongoose } = require("mongoose");
const { connect } = require("../db.js");
const { Author } = require("../models/Author.js");

const authorNormalization = async () => {
  try {
    await connect();
    console.log("Conexión realizada correctamente.");

    const authors = await Author.find();
    console.log(`Hemos recuperado ${authors.length} autores de la base de datos`);

    // Actualizamos los campos según las reglas de negocio que queramos
    // Podríamos incluso eliminar datos que no sean correctos
    for (let i = 0; i < authors.length; i++) {
      const author = authors[i];
      author.country = author.country.toUpperCase();
      await author.save();

      console.log(`Modificado autor ${author.name}`);
    }

    console.log("Modificados todos los autores de nuestra base de datos");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

authorNormalization();
