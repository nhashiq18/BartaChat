const asyncHandler = require("express-async-handler");
const Chat = require("../../models/chatModel");
const User = require("../../models/userModel"); // Import the User model correctly

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId param not sent with the request");
    res.status(400).send(); // Correct status code and send response
    return;
  }

  try {
    const isChat = await Chat.findOne({
      users: {
        $all: [req.user._id, userId], // Use $all to match both user IDs
      },
    })
      .populate("users", "-password")
      .populate("latestMessage.sender", "name profilePhoto email"); // Populate latestMessage.sender

    if (isChat) {
      res.status(200).json(isChat);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findById(createdChat._id)
        .populate("users", "-password");

      res.status(200).json(fullChat);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = accessChat;
