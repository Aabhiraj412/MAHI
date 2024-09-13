import HospitalModel from "../../Models/hopspital.model.js";
import PatientsModel from "../../Models/patients.model.js";
import UserModel from "../../Models/user.model.js";

export const admitPatient = async (req, res) => {
    try{
        const {patientId} = req.body;

        if(!patientId){
            return res.status(400).json({message: "Please Enter Patient ID"});
        }

        const patient = await UserModel.findById({_id: patientId});

        if(!patient){
            return res.status(400).json({message: "Patient Not Found"});
        }

        const hospital = req.hospital;
        
        if(patient.status === "Admitted"){
            return res.status(400).json({message: "Patient Already Admitted"});
        }

        if(hospital.beds_in_use.length >= hospital.total_beds_available){
            return res.status(400).json({message: "General Ward is Full"});
        }

        const newPatient = new PatientsModel({
            patient: patient._id
        });
        
        if(newPatient){

            newPatient.save();
            
            hospital.beds_in_use.push(newPatient._id);
            hospital.patients.push(newPatient._id);

            await HospitalModel.updateOne({_id: hospital._id}, hospital);

            await UserModel.updateOne({_id: patient._id}, {status: "Admitted"});

            res.status(200).json({message: "Patient Admitted Successfully"});
        }

    }
    catch (error){
        res.status(500).json({message: "Server Error", error: error.message});
        console.log("Error in Admit Patient Controller");
        console.log(error.message);
    }
}

export const dischargePatient = async (req, res) => {
    try{
        const {patientId} = req.body;

        if(!patientId){
            return res.status(400).json({message: "Please Enter Patient ID"});
        }

        const patient = await PatientsModel.findById({_id: patientId});

        if(!patient){
            return res.status(400).json({message: "Patient Not Found"});
        }

        const hospital = req.hospital;

        if(!hospital.beds_in_use.includes(patient._id)){
            return res.status(400).json({message: "Patient Not Admitted in this Hospital"});
        }

        const index = hospital.beds_in_use.indexOf(patient._id);

        if(index > -1){
            hospital.beds_in_use.splice(index, 1);
        }

        await PatientsModel.updateOne({_id: patientId}, {discharge: new Date()});

        await HospitalModel.updateOne({_id: hospital._id}, hospital);

        await UserModel.updateOne({_id: patient.patient}, {status: "Normal"});

        res.status(200).json({message: "Patient Discharged Successfully"});

    }
    catch (error){
        res.status(500).json({message: "Server Error", error: error.message});
        console.log("Error in Discharge Patient Controller");
        console.log(error.message);
    }
}

export const patientDetails = async(req,res) =>{
    try{

        const patient = await PatientsModel.findById(req.params._id);

        if(!patient){
            res.status(400).json({message: "Patient Not Found"});
        }

        res.status(200).json(patient);
        
    }
    catch (error){
        res.status(500).json({message: "Server Error", error: error.message});
        console.log("Error in Patient Details Controller");
        console.log(error.message);
    }
}