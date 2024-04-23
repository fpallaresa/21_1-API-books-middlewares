const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Book } = require("../models/Book.js");

const bookSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");

    // Borrar datos
    await Book.collection.drop();
    console.log("Libros eliminados");

    const bookList = [
      { title: "The Lost Symphony", pages: 980, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Midnight Symph", pages: 98, publisher: { name: "Fantasy Books Co.", country: "JAPAN" } },
      { title: "The Secret Symphony", pages: 700, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "The Silver Symphony", pages: 936, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "The Hidden Symphony", pages: 956, publisher: { name: "Make Publishers", country: "JAPAN" } },
      { title: "Whispers in the Wind", pages: 909, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "The Lost City", pages: 370, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "Lost in Time", pages: 868, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "The Hidden Path", pages: 820, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Crimson Symphony", pages: 149, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "The Forgotten King", pages: 196, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Emerald Isle", pages: 602, publisher: { name: "Story Publications", country: "JAPAN" } },
      { title: "Whispers of the Hear", pages: 820, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Hidden Symphony", pages: 736, publisher: { name: "Fantasy Books Co.", country: "JAPAN" } },
      { title: "The Star Symphony", pages: 955, publisher: { name: "Fantasy Books Co.", country: "JAPAN" } },
      { title: "The Midnight Sonata", pages: 399, publisher: { name: "Story Publications", country: "JAPAN" } },
      { title: "The Midnight Sonata", pages: 522, publisher: { name: "Fictional Press", country: "JAPAN" } },
      { title: "Lost in Time", pages: 212, publisher: { name: "Bookworm Publishing", country: "JAPAN" } },
      { title: "The Hidden Treasure", pages: 271, publisher: { name: "Bookworm Publishing", country: "JAPAN" } },
      { title: "The Star Symphony", pages: 674, publisher: { name: "Make Publishers", country: "JAPAN" } },
      { title: "Enchanted Symphony", pages: 588, publisher: { name: "Fantasy Books Co.", country: "JAPAN" } },
      { title: "The Emerald Symphony", pages: 267, publisher: { name: "Fictional Press", country: "JAPAN" } },
      { title: "Midnight Symphony", pages: 562, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "The Silver Lining", pages: 207, publisher: { name: "Fictional Press", country: "JAPAN" } },
      { title: "The Secret Symphony", pages: 471, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "The Golden Symphony", pages: 58, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "The Hidden Symphony", pages: 922, publisher: { name: "Make Publishers", country: "JAPAN" } },
      { title: "Whispers in the Wind", pages: 831, publisher: { name: "Fictional Press", country: "JAPAN" } },
      { title: "A Tale of Two Cities", pages: 390, publisher: { name: "Bookworm Publishing", country: "JAPAN" } },
      { title: "The Crystal Key", pages: 957, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Midnight Sonata", pages: 395, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Crimson Symphony", pages: 910, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "Midnight Symphony", pages: 507, publisher: { name: "Fantasy Books Co.", country: "JAPAN" } },
      { title: "The Starl Symphony", pages: 800, publisher: { name: "Make Publishers", country: "JAPAN" } },
      { title: "The Hidden Symphony", pages: 570, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "The Hidden Symphony", pages: 794, publisher: { name: "Fictional Press", country: "JAPAN" } },
      { title: "The Silver Symphony", pages: 966, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Star Symphony", pages: 317, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "Whispers in the Wind", pages: 438, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "The Lost Symphony", pages: 731, publisher: { name: "Fictional Press", country: "JAPAN" } },
      { title: "The Forgot Symphony", pages: 401, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Crimson Symphony", pages: 392, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Secret Symphony", pages: 214, publisher: { name: "Bookworm Publishing", country: "JAPAN" } },
      { title: "The Hidden Symphony", pages: 728, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "Midnight Masquerade", pages: 656, publisher: { name: "Story Publications", country: "JAPAN" } },
      { title: "The Crystal Key", pages: 773, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "The Crimson Symphony", pages: 163, publisher: { name: "Fantasy Books Co.", country: "JAPAN" } },
      { title: "Enchanted Symphony", pages: 97, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "The Golden Compass", pages: 409, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "Whispers in the Wind", pages: 360, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "The Golden Gate", pages: 795, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "The Crimson Symphony", pages: 998, publisher: { name: "Bookworm Publishing", country: "JAPAN" } },
      { title: "The Forgotten Realm", pages: 704, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Hidden Symphony", pages: 535, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "The Crimson Symphony", pages: 981, publisher: { name: "Make Publishers", country: "JAPAN" } },
      { title: "The Hidden Treasure", pages: 57, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Last Voyage", pages: 487, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "The Golden Symphony", pages: 539, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "The Lost Symphony", pages: 787, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "The Emerald Isle", pages: 449, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Forgot Symphony", pages: 333, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Golden Symphony", pages: 64, publisher: { name: "Story Publications", country: "JAPAN" } },
      { title: "The Emerald Symphony", pages: 233, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Secret Symphony", pages: 730, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Crimson Symphony", pages: 492, publisher: { name: "Fictional Press", country: "JAPAN" } },
      { title: "The Forgot Symphony", pages: 935, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "The Silver Lining", pages: 475, publisher: { name: "Story Publications", country: "JAPAN" } },
      { title: "The Golden Symphony", pages: 205, publisher: { name: "Story Publications", country: "JAPAN" } },
      { title: "The Enchanted Mirror", pages: 646, publisher: { name: "Make Publishers", country: "JAPAN" } },
      { title: "The Crimson Symphony", pages: 602, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "The Forgot Symphony", pages: 430, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "Midnight Symphony", pages: 854, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "A Tale of Two Cities", pages: 625, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "The Star Chronicles", pages: 966, publisher: { name: "Fantasy Books Co.", country: "JAPAN" } },
      { title: "The Forgot Symphony", pages: 388, publisher: { name: "Bookworm Publishing", country: "JAPAN" } },
      { title: "The Lost City", pages: 374, publisher: { name: "Story Publications", country: "JAPAN" } },
      { title: "The Lost Symphony", pages: 264, publisher: { name: "Make Publishers", country: "JAPAN" } },
      { title: "The Star Symphony", pages: 365, publisher: { name: "Bookworm Publishing", country: "JAPAN" } },
      { title: "The Forgot Realm", pages: 709, publisher: { name: "Story Publications", country: "JAPAN" } },
      { title: "The Hidden Path", pages: 432, publisher: { name: "Fantasy Books Co.", country: "JAPAN" } },
      { title: "The Lost Symphony", pages: 576, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Hidden Symphony", pages: 146, publisher: { name: "Fictional Press", country: "JAPAN" } },
      { title: "The Forgot Realm", pages: 603, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Lost Symphony", pages: 865, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Silver Symphony", pages: 308, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Secret Symphony", pages: 822, publisher: { name: "Novelty Books Inc.", country: "JAPAN" } },
      { title: "Enchanted Forest", pages: 802, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "The Secret Keeper", pages: 987, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "The Hidden Symphony", pages: 284, publisher: { name: "Fictional Press", country: "JAPAN" } },
      { title: "The Silver Sword", pages: 314, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "The Secret Symphony", pages: 843, publisher: { name: "Make Publishers", country: "JAPAN" } },
      { title: "The Secret Garden", pages: 927, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Golden Symphony", pages: 574, publisher: { name: "Story Publications", country: "JAPAN" } },
      { title: "The Crystal Key", pages: 496, publisher: { name: "Whimsical Press", country: "JAPAN" } },
      { title: "The Silver Symphony", pages: 596, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "The Golden Symphony", pages: 62, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
      { title: "The Forgot Kingdom", pages: 308, publisher: { name: "Dreams Publishing", country: "JAPAN" } },
      { title: "Enchanted Symphony", pages: 950, publisher: { name: "Imaginary House", country: "JAPAN" } },
      { title: "The Emerald City", pages: 454, publisher: { name: "Make Publishers", country: "JAPAN" } },
      { title: "The Golden Compass", pages: 755, publisher: { name: "Enchanted Editions", country: "JAPAN" } },
    ];

    const documents = bookList.map((book) => new Book(book));
    await Book.insertMany(documents);

    console.log("Libros creados correctamente!");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

bookSeed();
