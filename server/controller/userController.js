//register user
import User from "../model/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cloudinary from 'cloudinary'
export const registerUser=async(req,res)=>{
    try{

        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.json({success:false,message:"Missing details"});
        }
        
        const existUser=await User.findOne({email});
        if(existUser){
            return res.json({success:false,message:"Already user existed"});
        }
        
        const hashPassword=await bcrypt.hash(password,10); 
        const newUser=await User.create({username,email,password:hashPassword,isOnline:true});
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' })
        res.cookie('Refreshtoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({ success: true,newUser,message:'registered successfully' })
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }   
}

//login user

export const loginUser=async(req,res)=>{
    try {
          const {email,password}=req.body;
        if(!email || !password){
            return res.json({success:false,message:"enter the details correctly"})
        }
        const user=await User.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        await User.findByIdAndUpdate(user._id,{isOnline:true})
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({ success: false, message: "Enter valid email and password" })
        }
      const token = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' })
        res.cookie('Refreshtoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({success:true,user,message:'login successfully'})
        //return res.json({ success: true, user: { email:user.email,name:user.username } })
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}

//logout user

export const logout=async(req,res)=>{
    try{
      const userid=req.userId
      await User.findByIdAndUpdate(userid,{isOnline:false})
        res.clearCookie('Refreshtoken',{
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production"?"none":"strict"
        })
        return res.json({success:true,message:"Logged Out"})
    }catch(error){
         console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}

//userauthentication

export const userAuth = async (req, res) => {
    try {
        const userId  = req.userId
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user })
    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}

//update user profile

export const updateUserProfile = async (req, res) => {
  try {
    const profileData = JSON.parse(req.body.details);
    const updateFields = {};

    // Only add fields if they exist and are valid
    if (profileData.fullname && profileData.fullname.trim() !== "") {
      updateFields.fullname = profileData.fullname.trim();
    }

    if (profileData.email && profileData.email.trim() !== "") {
      updateFields.email = profileData.email.trim();
    }

    // username is required & unique - only update if provided and non-empty
    if (profileData.username && profileData.username.trim() !== "") {
      updateFields.username = profileData.username.trim();
    }

    // bio can be empty string - allow clearing bio
    if (profileData.bio !== undefined) {
      updateFields.bio = profileData.bio.trim();
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image',
      });
      updateFields.profilePicture = result.secure_url;  // match your schema field name
    }
    console.log(updateFields.profilePicture)

    const userId = req.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    return res.json({ success: true, message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.log(error.message);
    // Handle duplicate username error nicely
    if (error.code === 11000 && error.keyPattern?.username) {
      return res.status(409).json({ success: false, message: "Username already taken" });
    }
    return res.json({ success: false, message: error.message });
  }
};

