const mongoose=require("mongoose");
require('dotenv').config();
const uri=process.env.DATABASE;
const connectDB=async()=>
{
     if(!uri) return console.error("Please provide MongoDB URI");
    return await mongoose.connect(uri).then(() => {
        console.log('Connected to MongoDB Successfully');
    })
}

    

module.exports=connectDB;