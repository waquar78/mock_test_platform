import mongoose from "mongoose";

const connnectDb=async()=>{
    try {
       const connect=await mongoose.connect(process.env.MONGO_URI) 
       console.log("database connsection successful");

    } catch (error) {
        console.log("database connsection failed");
        
    }
}
export default connnectDb;