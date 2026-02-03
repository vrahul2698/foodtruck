const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./route/authRoute");
const profileRoute = require("./route/profileRoute");
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/", authRouter);
app.use("/", profileRoute);
// app.get("/", (req, res) => {
//     res.send("Food Truck Backend is running🍇😋")
// })


module.exports = app;