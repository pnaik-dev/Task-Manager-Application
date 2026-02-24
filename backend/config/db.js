const mongoose = require("mongoose")

const {MONGO_URI} = require("./dotenv")

//database connection
const connectDB = async() =>{
    try{
        await mongoose.connect(MONGO_URI).then(()=>{
            console.log('database connection successfull!')
        })
    }catch(error){
        console.log("database connection failed! " +error)
    }
}

module.exports = {
    connectDB
}
