import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongodb connected successfully")
    } catch (error) {
        console.log("Error connecting to MongoDb\n", error);
        process.exit(1) // exit with failure
    }
}