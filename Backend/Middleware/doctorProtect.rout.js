import jwt from 'jsonwebtoken';
import DoctorModel from '../Models/doctor.model.js';

const doctorProtectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorised-no Token Provided"});
        }
        
        const decode = jwt.verify(token,process.env.JWT_Doct);
        
        if(!decode){
            return res.status(401).json({message:"Invalid Token"});
        }
        const doctor = await DoctorModel.findById(decode.user);

        if(!doctor){
            return res.status(401).json({message:"No Doctor Found"});
        }
        
        req.doctor = doctor;

        next();
    }
    catch(e){
        res.status(500).json({message: "Some error Occur in Doctor Protect Route"});
        console.log("Some erroe Occur in Protect Route", e.message);
    }

};

export default doctorProtectRoute;