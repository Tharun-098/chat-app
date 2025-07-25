import mongoose from "mongoose";

const connectDatabase=async()=>{
    try{
        mongoose.connection.on('connected',()=>console.log("Database connected"))
        //const url='mongodb+srv://tharun:tharun123@cluster0.gjhs5os.mongodb.net/realtimechat?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(process.env.MONGODB_URL)
    }
    catch(error){
        console.log(error.message)
    }
}

export default connectDatabase