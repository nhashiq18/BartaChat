const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();


//database connection
mongoose.connect(process.env.MONGOCONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected successfully!"))
.catch((error)=> console.log(error));