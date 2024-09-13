import jwt from 'jsonwebtoken';
import UserModel from '../Models/user.model.js';

const userProtectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorised-no Token Provided"});
        }

        const decode = jwt.verify(token,process.env.JWT_User);
        
        if(!decode){
            return res.status(401).json({message:"Invalid Token"});
        }
        
        const user = await UserModel.findById(decode.user);

        if(!user){
            return res.status(401).json({message:"No User Found"});
        }
        // const user = await UserModel.findById(decode.userId);
        
        req.user = user;

        next();
    }
    catch(e){
        res.status(500).json({message: "Some error Occur in User Protect Route"});
        console.log("Some erroe Occur in Protect Route", e.message);
    }

};

export default userProtectRoute;