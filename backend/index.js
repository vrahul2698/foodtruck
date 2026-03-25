require("dotenv").config();
const app = require("./server");


const PORT = process.env.PORT || 5000;
const connectDb = require("./config/database");
// Section where backend is connected to the port
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Backend is runing on port ${PORT} - 🍄✈️`)
    })
}).catch(err => console.log("Connection Error : " + err?.message))
