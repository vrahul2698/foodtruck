
const app = require("./server");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Section where backend is connected to the port
app.listen(PORT, () => {
    console.log(`Backend is runing on port ${PORT}`)
})