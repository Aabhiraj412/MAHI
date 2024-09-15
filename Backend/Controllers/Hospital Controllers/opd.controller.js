import DoctorModel from "../../Models/doctor.model.js";
import HospitalModel from "../../Models/hopspital.model.js";
import OPDModel from "../../Models/opd.model.js";

export const addOPD = async (req, res) => {
    try {

        const {name, total_slots} = req.body;

        if(!name ||!total_slots){
            return res.status(400).json({message: "Name and Total Slots are required"});
        }

        const hospital = req.hospital;

        if(hospital.OPD_names.includes(name)){
            return res.status(400).json({message: "OPD already exists"});
        }

        const newOPD = new OPDModel({
            array: [],
            doctors: [],  // array of doctor IDs
            name, 
            total_slots
        });
        if(newOPD){
            await newOPD.save();
            res.status(200).json(newOPD);
            console.log(newOPD);

            hospital.OPDs.push(newOPD._id);
            hospital.OPD_names.push(name);
            await HospitalModel.updateOne({_id: hospital._id}, {OPDs: hospital.OPDs, OPD_names:hospital.OPD_names});
        }
    } catch (error) {
        console.log('Some Error occur in OPD Controller');
        console.log(error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const opdDetails = async (req, res) => {
    try {
        const opd = await OPDModel.findById(req.params._id);

        if(!opd){
            return res.status(404).json({message: "OPD not found"});
        }

        res.status(200).json(opd);
    } catch (error) {
        console.log('Some Error occur in OPD Details Controller');
        console.log(error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const addOPDDoctor = async (req, res) => {
    try{
        const {opdId, doctorId} = req.body;

        if(!opdId || !doctorId){
            return res.status(400).json({message: "Please Enter All Details"});
        }

        const hospital = req.hospital;

        const opd = await OPDModel.findById({_id: opdId});
        
        if(!hospital.OPDs.includes(opdId)){
            return res.status(400).json({message: "OPD Not Found"});
        }
        
        const doctor = await DoctorModel.findById({_id: doctorId});
        
        if(!hospital.doctors.includes(doctorId)){
            return res.status(400).json({message: "Doctor Not Found"});
        }

        if(doctor.OPD){
            return res.status(400).json({message: "Doctor Already associated with Other OPD"});
        }
        
        if(opd.doctors.includes(doctor._id)){
            return res.status(400).json({message: "Doctor already associated with this OPD"});
        }
        
        opd.doctors.push(doctor._id);

        await DoctorModel.updateOne({_id: doctorId}, {OPD: opdId});
        await OPDModel.updateOne({_id: opdId}, opd);

        res.status(200).json({message: "Doctor added successfully to OPD"});
    }
    catch(error){
        console.log('Some Error occur in OPD Doctor Controller');
        console.log(error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}