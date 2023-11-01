const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateJWT = require("../config/generateJWT");

const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profilePhoto: user.profilePhoto,
            token: generateJWT(user._id),
        })
    }
});

module.exports = loginUser;