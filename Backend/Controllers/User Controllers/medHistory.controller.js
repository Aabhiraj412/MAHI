import DoctorModel from "../../Models/doctor.model.js";
import MedicalModel from "../../Models/medHistory.model.js";
import UserModel from "../../Models/user.model.js";

export const updateMedHistory = async(req,res) => {
    try {

        const {
            doctor,
            medical_condition,
            reports
        } = req.body;
        
        if(!doctor || !medical_condition || !reports){
            return res.status(400).json({message: "All fields are required"});
        }
        
        const doctorExists = await DoctorModel.findById({_id: doctor});

        if(!doctorExists){
            return res.status(400).json({message: "Doctor not found"});
        }
        
        const newMedHistory = new MedicalModel({
            doctor,
            medical_condition,
            reports
        });
        
        if(newMedHistory){

            await newMedHistory.save();
            
            console.log("Medical History Updated");
            
            res.status(201).json({
                doctor: newMedHistory.doctor,
                medical_condition: newMedHistory.medical_condition,
                reports: newMedHistory.reports
            });
        }
        
        const user = req.user;

        user.medical_reports.push(newMedHistory._id);
        
        await UserModel.updateOne({ _id: user._id }, { $set: user });
    }
    catch (error) {
        console.log('Some error occured in updateMedHistory');
        return res.status(500).json({message: "Some error occured"});   
    }
}

export const medHistoryDetails = async(req,res) => {
    try{
        const med = await MedicalModel.findById(req.params._id);

        if(!med){
            return res.status(400).json({message: "Medical History not found"});
        }

        res.status(200).json({
            doctor: med.doctor,
            medical_condition: med.medical_condition,
            reports: med.reports
        });

    }
    catch (error) {
        console.log('Some error occured in Med History Details');
        console.log(error.message);
        return res.status(500).json({message: "Some error occured in Med History Details", error: error.message});
    }
}