import HospitalModel from "../../Models/hopspital.model.js";
import OPDModel from "../../Models/opd.model.js";

export const viewHospitals = async (req, res) => {
    try{
        const hospitals = await HospitalModel.find();

        if(!hospitals){
            return res.status(404).json({error:"No Hospitals Found"});
        }

        res.status(200).json(hospitals);
    }
    catch(e){
        console.log("Error in User Controller");
        console.log(e.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getInQueue = async (req, res) => {
    try{
        const {opdId} = req.body;

        if(!opdId){
            return res.status(400).json({error:"Please Enter Opd ID"});
        }

        const opd = await OPDModel.findById(opdId);
        const user = req.user;

        if(opd.array.includes(user._id)){
            return res.status(400).json({error:"Already in Queue"});
        }

        if(opd.array.length>=opd.total_slots){
            return res.status(400).json({error:"Queue is Full"});
        }

        opd.array.push(user._id);

        await OPDModel.updateOne({_id: opdId}, opd);

        res.status(200).json({message:"Patient added to Queue", "Queue no":opd.array.length});
    }
    catch(e){
        console.log("Error in User Controller");
        console.log(e.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}