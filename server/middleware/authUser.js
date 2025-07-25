import jwt from "jsonwebtoken"
const authorization=async(req,res,next)=>{

    const token=req.cookies?.Refreshtoken;
    try{
        const decodeToken=jwt.verify(token,process.env.JWT_REFRESH_TOKEN)
        console.log(decodeToken.id)
        if(decodeToken.id){
            req.userId=decodeToken.id
        }
        else{
            return res.json({success:false,message:"Not Authorized"})
        }
        next();
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

export default authorization