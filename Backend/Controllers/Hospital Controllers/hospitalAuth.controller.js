import { generateHospToken } from "../../Util/generateToken.js";

import HospitalModel from "../../Models/hopspital.model.js";

import bcrypt from 'bcryptjs';

export const hospitalRegister = async (req, res) => {
    try {
        const{
            name,
            DOE,
            registryno,
            password,
            confirmPassword,
            // beds_in_use: [{ 
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'General_Ward', 
            // }],
            total_beds_available,
            helpline,
            // doctors: [{ 
            //     type: mongoose.Schema.Types.ObjectId, 
            //     ref: 'Doctors' 
            // }],
            address,
            city,
            state
            // OPDs:[{
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'OPDs', 
            // }]
        } = req.body;
        
        if(!name || !DOE || !state || !registryno || !password || !confirmPassword || !total_beds_available || !address || !city || !helpline){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password!==confirmPassword){
            return res.status(400).json({message: "Passwords do not match"});
        }

        const hospital = await HospitalModel.findOne({registryno});

        if(hospital){
            return res.status(400).json({message: "Hospital with this registration number already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, salt);
        // console.log(hashpass);

        const newHospital = new HospitalModel({
            name,
            DOE,
            registryno,
            password: hashpass,
            beds_in_use: [],
            patients: [],
            total_beds_available,
            helpline,
            doctors: [],
            address,
            city,
            state,
            OPDs:[]
        });

        if(newHospital){
            generateHospToken(newHospital._id,res);

            await newHospital.save();

            res.status(201).json({
                _id: newHospital._id,
                name: newHospital.name,
                DOE: newHospital.DOE,
                registryno: newHospital.registryno,
                total_beds_available: newHospital.total_beds_available,
                beds_in_use: newHospital.beds_in_use,
                patients: newHospital.patients,
                opds: newHospital.OPDs,
                helpline: newHospital.helpline,
                address: newHospital.address,
                city: newHospital.city,
                state: newHospital.state,
                doctors: newHospital.doctors,  //add doctors to hospital
                // token: generateDocTocken(newHospital._id,res),  //generate JWT token for hospital login
                created_at: newHospital.createdAt,
                updated_at: newHospital.updatedAt
            });

            console.log(`Hospital ${newHospital.name} registered`);
        }

    } catch (error) {
        console.log('Some error occur in Hospital Auth Controller');
        console.log(error);
        return res.status(500).json({message: "Some error occured in Hospital Auth Controller",error: error.message});
    }
};

export const hospitalLogin = async (req, res) => {
    try {
        const {
            registryno,
            password
        } = req.body;

        if(!registryno ||!password){
            return res.status(400).json({message: "All fields are required"});
        }

        const hospital = await HospitalModel.findOne({registryno});

        if(!hospital){
            return res.status(401).json({message: "Invalid registration number or password"});
        }

        const isMatch = await bcrypt.compare(password, hospital.password);

        if(!isMatch){
            return res.status(401).json({message: "Invalid registration number or password"});
        }

        generateHospToken(hospital._id,res);

        res.status(200).json({
            _id: hospital._id,
            name: hospital.name,
            DOE: hospital.DOE,
            registryno: hospital.registryno,
            total_beds_available: hospital.total_beds_available,
            beds_in_use: hospital.beds_in_use,
            patients: hospital.patients,
            opds: hospital.OPDs,
            helpline: hospital.helpline,
            address: hospital.address,
            doctor: hospital.doctors,
            city: hospital.city,
            state: hospital.state,
            // token: generateDocTocken(hospital._id,res),  //generate JWT token for hospital login
            created_at: hospital.createdAt,
            updated_at: hospital.updatedAt
        });

        console.log(`Hospital ${hospital.name} logged in`);
    }
    catch (error) {
        console.log('Some error occur in Hospital Auth Controller');
        console.log(error);
        return res.status(500).json({message: "Some error occured in Hospital Auth Controller", error: error.message});
    }
};

export const hospitalLogout = async (req, res) => {
    try{
        res.cookie('jwt','',{maxAge:0});
        res.status(200).json({message: "Loged Out Successfully"});
    }
    catch(err){
        console.log("Error in Logout controller ", err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
    console.log("logout");
};

export const hospitalProfile = async (req,res) => {
    try{
        const hospital = req.hospital;
        // console.log(hospital);
        res.status(200).json({
            _id: hospital._id,
            name: hospital.name,
            DOE: hospital.DOE,
            registryno: hospital.registryno,
            total_beds_available: hospital.total_beds_available,
            beds_in_use: hospital.beds_in_use,
            patients: hospital.patients,
            opds: hospital.OPDs,
            helpline: hospital.helpline,
            address: hospital.address,
            city: hospital.city,
            state: hospital.state,
            doctors: hospital.doctors,
            // token: generateDocTocken(hospital._id,res),  //generate JWT token for hospital login
            created_at: hospital.createdAt,
            updated_at: hospital.updatedAt
        });

        console.log(`Hospital ${hospital.name} profile fetched`);
    }
    catch(e){
        console.log("Error in Hospital Profile Controller ", e.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const hospitalProfileDetails = async (req,res) => {
    try{
        const hospital = await HospitalModel.findById(req.params._id);
        
        res.status(200).json({
            _id: hospital._id,
            name: hospital.name,
            DOE: hospital.DOE,
            registryno: hospital.registryno,
            total_beds_available: hospital.total_beds_available,
            beds_in_use: hospital.beds_in_use,
            patients: hospital.patients,
            opds: hospital.OPDs,
            helpline: hospital.helpline,
            address: hospital.address,
            city: hospital.city,
            state: hospital.state,
            doctors: hospital.doctors,
            // token: generateDocTocken(hospital._id,res),  //generate JWT token for hospital login
            created_at: hospital.createdAt,
            updated_at: hospital.updatedAt
        });

        console.log(`Hospital ${hospital.name} profile fetched`);
    }
    catch(e){
        console.log("Error in Hospital Profile Controller ", e.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};
