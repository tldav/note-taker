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
	newNote.id = noteFile.length;

	noteFile.forEach((note) => {
		if (note.id === newNote.id) {
			newNote.id++;
		}
	});

	noteFile.push(newNote);

	return res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
	const id = req.params.id;

	for (i = 0; i < noteFile.length; i++) {
		if (id == noteFile[i].id) {
			noteFile.splice(id, 1);
		}
	}

	return res.json(noteFile);
});

app.listen(PORT, () => console.log(`Listening on port:${PORT}....`));
