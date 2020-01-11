// Express för server
const express = require("express");
// Bodyparser för JSON-hantering
const bodyParser = require("body-parser");
const cors = require("cors");

// Sätter upp express-appen
const app = express();

// Middleware som hanterar JSON-data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

// Hämta bok-filen
const books = require("./routes/api/books");

// Alla routes till books ska gå via bok-filen
app.use("/api/books", books);

// Sätter upp på en port (första för Heroku och andra för localhost)
const port = process.env.PORT || 3000;

// Lyssnar för request till port 3000
app.listen(port, function () {
    console.log(`Lyssnar efter anrop på ${port}`);
 });
 