// Express för server
const express = require("express");
// Bodyparser för JSON-hantering
const bodyParser = require("body-parser");
const cors = require("cors");

// Sätter upp express-appen
const app = express();

// Middleware som hanterar JSON-data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Åtkomst
app.use(cors());

// TIllåter åtkomst från samtliga domäner
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();
});
// Hämta bok-filen
const books = require("./routes/api/books");

// Alla routes till books ska gå via bok-filen
app.use("/api/books", books);

// Hanterar utvecklingen
if(process.env.NODE_ENV === "production") {
    // Statisk katalog
    app.use(express.static(__dirname + "/public/"));

    // HAntera singe page applikationen
    // .* refererar till alla routes
    app.get(/.*/, (req, res) => {
        // Skickar till startsidan
        res.sendFile(__dirname + "/public/index.html")
    });
}
// Sätter upp på en port (första för Heroku och andra för localhost)
const port = process.env.PORT || 3000;

// Lyssnar för request till port 3000
app.listen(port, function () {
    console.log(`Lyssnar efter anrop på ${port}`);
});
