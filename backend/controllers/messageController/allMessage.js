const asyncHandler = require("express-async-handler");
const Message = require("../../models/messageModel");

/*
fetch messages of a particular chat
 */
const allMessage = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name profilePhoto email")
          .populate("chat");
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
});
module.exports = allMessage;
