const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const noteFile = require("./db/db.json");
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
	return res.json(noteFile);
});

app.post("/api/notes", (req, res) => {
	const newNote = req.body;

	console.log(req.body);

	noteFile.push(newNote);

	const idTest = noteFile[2];

	idTest.id = 3;

	return res.json(newNote);
});

// app.delete("/api/notes/:id", (req, res) => {});

app.listen(PORT, () => console.log(`Listening on port:${PORT}....`));

// const obj = {
// 	key1: "value1",
// 	key2: "value2"
// };

// obj.key3 = "value3";

// console.log(obj);
