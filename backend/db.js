const mongoose=require("mongoose")

const mongoURI = "mongodb+srv://gagan:Gagan@helphaven2.m1dogqc.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo=()=>
{
    mongoose.connect(mongoURI,()=>{console.log("connection secure")}
    )
}

module.exports=connectToMongo;