const mongoose = require("mongoose");
const ConnectDB = async () =>{
        try {
              const connect = await  mongoose.connect(process.env.MONGO_URI);
                console.log("connected to Database Successfully");
        } catch (error) {
                console.error("something went wrong:",error.message);
        }
}

module.exports = ConnectDB;