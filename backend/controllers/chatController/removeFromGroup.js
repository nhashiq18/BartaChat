const asyncHandler = require("express-async-handler");
const Chat = require("../../models/chatModel");
const User = require("../../models/userModel"); // Import the User model correctly

//remove user from group
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});
module.exports = removeFromGroup;
