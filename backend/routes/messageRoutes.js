const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const sendMessage = require("../controllers/messageController/sendMessage");
const allMessage = require("../controllers/messageController/allMessage");


const router = express.Router();

router.route("/").post(protect, sendMessage);
//router.route("/:chatId").get(protect, allMessage);



module.exports = router;
