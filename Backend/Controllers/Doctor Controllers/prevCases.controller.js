// import { compare } from "bcryptjs";
import DoctorModel from "../../Models/doctor.model.js";
import UserModel from "../../Models/user.model.js";

export const prevCases = async (req,res) => {
    try{
        const {
            userId
        } = req.body;

        if(!userId){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await UserModel.findById({_id: userId});

        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const doctor = req.doctor;

        doctor.previous_cases.push(userId);

        await DoctorModel.updateOne({_id: doctor._id},doctor);

        res.status(201).json({message: "Previous Cases Updated"});
    }
    catch(e){
        res.status(500).json({message: "Some error occur", error: e.message});
        console.log('Some error occur in Preevious Cases Controller');
        console.log(e.message);
    }
}