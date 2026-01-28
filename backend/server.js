const express = require("express");
const cors = require("cors");
const authRouter = require("./route/authRoute");
const app = express();
app.use(cors());
app.use(express.json());


app.use("/",authRouter)
// app.get("/", (req, res) => {
//     res.send("Food Truck Backend is running🍇😋")
// })


module.exports= app;