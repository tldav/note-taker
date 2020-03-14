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

	// fs.appendFile("/db/db.json", json.stringify(newNote), (err) => {
	// 	if (err) throw err;
	// });

	noteFile.push(newNote);

	return res.json(newNote);
});

app.listen(PORT, () => console.log(`Listening on port:${PORT}....`));
