const mongoose = require("mongoose");

const dbCon = async () =>{
    try {
       await mongoose.connect("mongodb+srv://musa:todo123@cluster0.nxmsu.mongodb.net/todo")
       console.log("Db Connected")
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = dbCon;