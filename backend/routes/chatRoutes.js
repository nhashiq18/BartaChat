const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const accessChat = require("../controllers/chatController/accessController");
const fetchChats = require("../controllers/chatController/fetchChats");
const createGroupChat = require("../controllers/chatController/createGroupChat");
const renameGroup = require("../controllers/chatController/renameGroup");
const removeFromGroup = require("../controllers/chatController/removeFromGroup");
const addToGroup = require("../controllers/chatController/addToGroup");


const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/removefromgroup").put(protect, removeFromGroup);
router.route("/addtogroup").put(protect, addToGroup);


module.exports = router;
