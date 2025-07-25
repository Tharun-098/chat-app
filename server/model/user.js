import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    fullname:{type:String,default:""},
    username:{type:String,required:true,unique:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    bio:{type:String,default:""},
    profilePicture: {type: String,default:""},
  isOnline: {type: Boolean,default: false}
},{timestamps:true})

const User=mongoose.models.user||mongoose.model("user",userSchema)

export default User