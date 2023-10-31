const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      profilePhoto: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Chat", userModel);

module.exports = User;
