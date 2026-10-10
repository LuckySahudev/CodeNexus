const express = require("express");
const auth = require("../middleware/auth");
const bookmarkController = require("../controllers/bookmarkController");

const router = express.Router();

router.get("/bookmarks", auth, bookmarkController.getBookmarks);

router.post("/bookmarks", auth, bookmarkController.addBookmark);

router.delete("/bookmarks/:questionId", auth, bookmarkController.removeBookmark);

module.exports = router;
