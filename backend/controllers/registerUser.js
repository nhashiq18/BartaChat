const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateJWT = require("../config/generateJWT");

const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, phone, password, profilePhoto} = req.body;
    if (!name || !email || !phone || !password) {
        res.send(400);
        throw new Error("Please input all the field!");
    }

    const userExist = await User.findOne({email});
    if (userExist) {
        res.send(400);
        throw new Error("This email is already is use. Please login!");
    }


    const createUser = await User.create({
        name,
        email,
        phone,
        password,
        profilePhoto,
        
    });

    if (createUser) {
        res.send(201).json({
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
            phone: createUser.phone,
            profilePhoto: createUser.profilePhoto,
            token: generateJWT(createUser._id),
        });
    }else{
        res.send(400);
        throw new Error("Failed to register! try again.")
    }
});

module.exports = registerUser;