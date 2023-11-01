const express = require("express");
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");
const allUsers = require("../controllers/searchController");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/").post(registerUser).get(protect,allUsers);
router.post("/login", loginUser);

module.exports = router;
