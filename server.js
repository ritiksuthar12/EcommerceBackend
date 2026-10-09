const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const ConnectDB = require("./config/db")
const UserRoute = require("./routes/authRoutes");
ConnectDB();
const cors = require("cors");
app.use(cors());    


app.get("/",(req,res)=>{
    res.send("hello world");
});

app.use("api/auth",UserRoute)

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});