const router = require("express").Router();
const {
	authUser,
	registerUser,
	recent,
	updateUserProfile,
	getUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", authUser);
router.route("/").post(registerUser);
router.route("/").get(protect, getUser);
router.route("/recent").get(protect, recent);
router.route("/update").put(protect, updateUserProfile);
module.exports = router;
