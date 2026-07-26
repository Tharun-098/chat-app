import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDatabase=async()=>{
    try{
        mongoose.connection.on('connected',()=>console.log("Database connected"))
        mongoose.connection.on("disconnected", () => {
            console.log("❌ MongoDB disconnected");
        });

        mongoose.connection.on("error", (err) => {
            console.log("MongoDB Error:", err);
        });
        //const url='mongodb+srv://tharun:tharun123@cluster0.gjhs5os.mongodb.net/realtimechat?retryWrites=true&w=majority&appName=Cluster0';
        console.log("🔍 Connecting to:", process.env.MONGODB_URL);
        console.log("Connected DB:", mongoose.connection.name);
        await mongoose.connect(process.env.MONGODB_URL)
    }
    catch(error){
        console.log(error.message)
    }
}

export default connectDatabase