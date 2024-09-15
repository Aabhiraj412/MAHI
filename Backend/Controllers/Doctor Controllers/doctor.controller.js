import OPDModel from "../../Models/opd.model.js";
import UserModel from "../../Models/user.model.js";

export const getPatients = async (req, res) => {
    try{
        const doctor = req.doctor;

        const opd = await OPDModel.findById( doctor.OPD);

        if(!opd){
            return res.status(404).json({error:"No OPD Found"});
        }
        
        res.status(200).json(opd.array);
    }
    catch(e){
        console.log("Error in Doctor Controller");
        console.log(e.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const removeFromQueue = async (req, res) =>{
    try{
        
        // const {userId} = req.body;

        // if(!user){
        //     return res.status(404).json({error:"User Id not Provided"});
        // }

        const doctor = req.doctor;

        const opd = await OPDModel.findById(doctor.OPD);

        if(!opd){
            return res.status(404).json({error:"No OPD Found"});
        }

        const userId = opd.array[0];

        if(!userId){
            return res.status(404).json({error:"No User in Queue"});
        }
        
        opd.array.splice(0, 1);

        await OPDModel.updateOne({_id: opd._id}, opd);

        res.status(200).json({userId: userId, message:"User Successfully Removed from Queue"});
    }
    catch(e){
        console.log("Error in Doctor Controller");
        console.log(e.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}