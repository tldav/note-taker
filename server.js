const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// class Note {
// 	constructor() {
// 		this.id = id;
// 	}

// 	readNote() {
// 		return fs.readFile("/db/db.json", "utf8", (err) => {
// 			if (err) throw err;
// 		});
// 	}

// 	writeNote(note) {
// 		return fs.writeFile("/db/db.json", note, (err) => {
// 			if (err) throw err;
// 		});
// 	}
// }

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
	res.sendfile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", (req, res) => {
	const newNote = req.body;

	fs.writeFile("/db/db.json", json.stringify(newNote), (err) => {
		if (err) throw err;
	});

	return res.json(newNote);
});

app.listen(PORT, () => console.log(`Listening on port:${PORT}....`));
