const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");

const {searchByLetter} = require("../controllers/searchController")

// Search Route
router.route("/:query").get(protect, searchByLetter);

module.exports = router;