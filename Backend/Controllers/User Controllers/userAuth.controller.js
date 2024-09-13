import bcrypt from "bcryptjs"; 

import UserModel from "../../Models/user.model.js";

import {generateUserToken} from '../../Util/generateToken.js';
export const userRegister = async (req, res) => {
    try{

        const {
            fullname,
            phoneno,
            email,
            aadhar,
            DOB,
            profile_pic,
            gender,
            fathers_name,
            password,
            status,
            conpassword,
            weight,
            address,
            city,
            state
        } = req.body;

        if(!fullname || !phoneno || !email || !aadhar || !DOB || !gender || !fathers_name || !password || !conpassword || !weight || !address || !city || !state){
            return res.status(400).json({error: 'All fields are required'});
        }

        if(password!==conpassword){
            return res.status(400).json({error: 'Passwords do not match'});
        }

        const aadharmatch = await UserModel.findOne({aadhar});
        const phonematch = await UserModel.findOne({phoneno});
        const emailmatch = await UserModel.findOne({email});

        if(phonematch){
            return res.status(400).json({error: 'Phone number already exists'});
        }

        if(emailmatch){
            return res.status(400).json({error: 'Email already exists'});
        }

        if(aadharmatch){
            return res.status(400).json({error: 'Aadhar number already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, salt);
        // console.log(hashpass);

        const newUser = await UserModel({
            fullname,
            phoneno,
            email,
            aadhar,
            profile_pic : profile_pic || '',
            DOB,
            status: status || 'Normal',
            gender,
            fathers_name,
            password: hashpass,
            medical_reports: [],
            weight,
            address,
            city,
            state
        })

        if(newUser){
            generateUserToken(newUser._id,res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                phoneno: newUser.phoneno,
                email: newUser.email,
                aadhar: newUser.aadhar,
                status: newUser.status,
                profile_pic: newUser.profile_pic,
                DOB: newUser.DOB,
                gender: newUser.gender,
                fathers_name: newUser.fathers,
                medical_reports: newUser.medical_reports,
                weight: newUser.weight,
                address: newUser.address,
                city: newUser.city,
                state: newUser.state,
                // token: generateToken(newUser._id,res),  //generate JWT token for user login
                created_at: newUser.createdAT,
                updated_at: newUser.updatedAt
            });

            console.log(`User ${newUser.fullname} Registered`);
        }
        else{
            res.status(400).json({error: 'Failed to register user'});
        }
    }
    catch(e){
        console.log('Error in User Signup Controller ');
        console.log(e.message);
        res.status(500).json({error: 'Server Error', message: e.message});
    }
};
export const userLogin = async (req, res) => {
    try{
        const{userInput,password} = req.body;
        
        const phoneMatch = await UserModel.findOne({phoneno:userInput});
        const emailMatch = await UserModel.findOne({email:userInput});
        const aadharMatch = await UserModel.findOne({aadhar:userInput});
        if(aadharMatch || phoneMatch || emailMatch) {
            const user = aadharMatch || phoneMatch || emailMatch;    
            const pass = await bcrypt.compare(password, user?.password||'');

            if(!user || !pass){
                return res.status(400).json({error: "Invalid Credentials"});
            }

            generateUserToken(user._id,res);

            res.status(200).json({
                _id: user._id,
                fullname: user.fullname,
                phoneno: user.phoneno,
                email: user.email,
                aadhar: user.aadhar,
                status: user.status,
                profile_pic: user.profile_pic,
                DOB: user.DOB,
                gender: user.gender,
                fathers_name: user.fathers_name,
                medical_reports: user.medical_reports,
                weight: user.weight,
                address: user.address,
                city: user.city,
                state: user.state,
                // token: generateToken(user._id,res),  //generate JWT token for user login
                created_at: user.createdAt,
                updated_at: user.updatedAt
            });
        }
        else{
            return res.status(400).json({error: "User not found"});
        }
        
    }
    catch(e){
        console.log('Error in User Login Controller ');
        console.log(e.message);
        res.status(500).json({error: 'Server Error', message: e.message});
    }
};

export const userLogout = async (req, res) => {
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

export const userProfile = async (req, res) => {
    try{
        const user = req.user;
        
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            phoneno: user.phoneno,
            email: user.email,
            aadhar: user.aadhar,
            status: user.status,
            profile_pic: user.profile_pic,
            DOB: user.DOB,
            gender: user.gender,
            fathers_name: user.fathers_name,
            medical_reports: user.medical_reports,
            weight: user.weight,
            address: user.address,
            city: user.city,
            state: user.state,
            created_at: user.createdAt,
            updated_at: user.updatedAt
        });
    }
    catch(e){
        console.log("Error in User Profile Controller ", e.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const userProfileDetails = async (req, res) => {
    try{
        const user = await UserModel.findById(req.params._id);
        
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            phoneno: user.phoneno,
            email: user.email,
            aadhar: user.aadhar,
            status: user.status,
            profile_pic: user.profile_pic,
            DOB: user.DOB,
            gender: user.gender,
            fathers_name: user.fathers_name,
            medical_reports: user.medical_reports,
            weight: user.weight,
            address: user.address,
            city: user.city,
            state: user.state,
            created_at: user.createdAt,
            updated_at: user.updatedAt
        });
    }
    catch(e){
        console.log("Error in User Profile Controller ", e.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}