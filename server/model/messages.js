import mongoose from "mongoose";
const messageSchema=mongoose.Schema({
    senderid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    receiverid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    text:{type:String},
    image:{type:String},
    video:{type:String},
    seen: { type: Boolean, default: false }
},{timestamps:true})

const Message=mongoose.models.message||mongoose.model("message",messageSchema)

export default Message