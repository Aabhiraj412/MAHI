import DoctorModel from "../../Models/doctor.model.js";

import { generateDocToken } from "../../Util/generateToken.js";

import bcrypt from 'bcryptjs';

export const doctorRegister = async (req, res) => {
    try {
        const {
            fullname,
            phoneno,
            email,
            aadhar,
            profile_pic,
            registryno,
            gender,
            dob,
            medical_expertise,
            experience,
            qualifications,
            password,
            confirmPassword,
            city,
            state
        } = req.body;

        if(!fullname || !registryno || !gender || !dob || !medical_expertise || !experience || !qualifications || !city || !state || !phoneno || !email || !aadhar || !password || !confirmPassword) {
            return res.status(400).json({message: 'All fields are required'});
        }

        if(password!==confirmPassword){
            return res.status(400).json({error: 'Passwords do not match'});
        }

        const phonematch = await DoctorModel.findOne({phoneno});
        const emailmatch = await DoctorModel.findOne({email});
        const aadharMatch = await DoctorModel.findOne({aadhar});
        const registrymatch = await DoctorModel.findOne({registryno});

        if(phonematch){
            return res.status(400).json({error: 'Phone number already exists'});
        }
        if(emailmatch){
            return res.status(400).json({error: 'Email already exists'});
        }
        if(aadharMatch){
            return res.status(400).json({error: 'Aadhar number already exists'});
        }
        if(registrymatch){
            return res.status(400).json({error: 'Registration number already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDoctor = new DoctorModel({
            fullname,
            phoneno,
            email,
            aadhar,
            profile_pic: profile_pic || '',
            registryno,
            gender,
            dob,
            medical_expertise,
            experience,
            qualifications,
            previous_cases: [],
            hospital: null,
            password: hashedPassword,
            city,
            state
        });

        if(newDoctor){
            generateDocToken(newDoctor._id, res);

            await newDoctor.save();

            res.status(201).json({
                _id: newDoctor._id,
                fullname: newDoctor.fullname,
                phoneno: newDoctor.phoneno,
                email: newDoctor.email,
                aadhar: newDoctor.aadhar,
                profile_pic: newDoctor.profile_pic,
                registryno: newDoctor.registryno,
                gender: newDoctor.gender,
                dob: newDoctor.dob,
                hospital: newDoctor.hospital,
                previous_cases: newDoctor.previous_cases,
                medical_expertise: newDoctor.medical_expertise,
                experience: newDoctor.experience,
                qualifications: newDoctor.qualifications,
                city: newDoctor.city,
                state: newDoctor.state,
                token: generateDocToken(newDoctor._id, res),  // generate JWT token for doctor login
            });

            console.log(`Doctor ${newDoctor.fullname} Registered`);
        }
    } catch (e) {
        res.status(500).json({message: 'Some error occured in Doctor Auth Controller', error: e.message});
        console.log('Some error occurred in Doctor Auth Controller');
        console.log(e.message);
    }
};
export const doctorLogin = async (req, res) => {
    try {
        const {
            userId,
            password
        } = req.body;

        if(!userId || !password){
            return res.status(400).json({message: 'All fields are required'});
        }

        const phonematch = await DoctorModel.findOne({phoneno: userId});
        const emailmatch = await DoctorModel.findOne({email: userId});
        const aadharMatch = await DoctorModel.findOne({aadhar: userId});
        const registryMatch = await DoctorModel.findOne({registryno: userId});

        const user = phonematch || emailmatch || aadharMatch || registryMatch;

        if(!user){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        generateDocToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            phoneno: user.phoneno,
            email: user.email,
            aadhar: user.aadhar,
            profile_pic: user.profile_pic,
            registryno: user.registryno,
            gender: user.gender,
            dob: user.dob,
            hospital: user.hospital,
            previous_cases: user.previous_cases,
            medical_expertise: user.medical_expertise,
            experience: user.experience,
            qualifications: user.qualifications,
            city: user.city,
            state: user.state,
            // token: generateDocToken(user._id, res)  // generate JWT token for doctor login
            created_at: user.createdAt,
            updated_at: user.updatedAt
        });

        console.log(`Doctor ${user.fullname} logged in`);
    } catch (error) {
        console.log('Some error occur in Doctor Auth Controller');
        console.log(error);
        return res.status(500).json({message: "Some error occured in Doctor Auth Controller",error: error.message});
    }
};

export const doctorLogout = async (req, res) => {
    try {
        res.cookie('jwt','',{maxAge:0});
        res.status(200).json({message: "Loged Out Successfully"});
    } catch (error) {
        console.log('Some error occur in Doctor Auth Controller');
        console.log(error);
        return res.status(500).json({message: "Some error occured in Doctor Auth Controller",error: error.message});
    }
};

export const doctorProfile = async (req, res) => {
    try {
        const doctor = req.doctor;
        if(!doctor){
            return res.status(404).json({message: 'Doctor not found'});
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.log('Some error occur in Doctor Auth Controller');
        console.log(error);
        return res.status(500).json({message: "Some error occured in Doctor Auth Controller",error: error.message});
        
    }
};
export const doctorProfileDetails = async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.params._id);

        if(!doctor){
            return res.status(404).json({message: 'Doctor not found'});
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.log('Some error occur in Doctor Auth Controller');
        console.log(error);
        return res.status(500).json({message: "Some error occured in Doctor Auth Controller",error: error.message});
        
    }
};