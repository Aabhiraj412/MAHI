import jwt from 'jsonwebtoken';
import HospitalModel from '../Models/hopspital.model.js';

const hospitalProtectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorised-no Token Provided"});
        }
        
        const decode = jwt.verify(token,process.env.JWT_Hosp);
        
        if(!decode){
            return res.status(401).json({message:"Invalid Token"});
        }
        
        const hospital = await HospitalModel.findById(decode.user);
        
        if(!hospital){
            return res.status(401).json({message:"No Hospital Found"});
        }
        
        req.hospital = hospital;

        next();
    }
    catch(e){
        res.status(500).json({message: "Some error Occur in Hospital Protect Route"});
        console.log("Some erroe Occur in Protect Route", e.message);
    }

};

export default hospitalProtectRoute;