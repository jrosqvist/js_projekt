// Inkluderar mongoose
const mongoose = require("mongoose");
// Skapar variabel för att kunna använda mongoose-scheman
const Schema = mongoose.Schema;

// Deklarerar ett nytt schema för kurser
let bookSchema = new Schema({
    title: String,
    author: String,
    published: Number,
    pages: Number,
});

// Skapar modell
// När en bok skapas hamnar den i collectionet bok och baseras på bok-Schemat
const Book = mongoose.model("books", bookSchema);

// Exporterar för att kunna användas i andra filer
module.exports = Book;

