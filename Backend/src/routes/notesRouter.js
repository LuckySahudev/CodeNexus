const express = require("express");
const auth = require("../middleware/auth");
const notesController = require("../controllers/notesController");

const router = express.Router();

router.get("/notes/types", auth, notesController.getNoteTypes);

router.get("/notes", auth, notesController.getNotes);

router.post("/notes", auth, notesController.createNote);

router.put("/notes/:noteId", auth, notesController.updateNote);

router.delete("/notes/:noteId", auth, notesController.deleteNote);

module.exports = router;
