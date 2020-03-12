const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
	res.sendfile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", (req, res) => {});

app.listen(PORT, () => console.log(`Listening on port:${PORT}....`));
