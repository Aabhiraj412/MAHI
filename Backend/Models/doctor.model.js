import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    previous_cases: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users' 
    }],
    hospital: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hospitals' 
    },
    profile_pic: {
        type: String,
    },
    fullname: { 
        type: String, 
        required: true 
    },
    phoneno: { 
        type: String, 
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
    },
    aadhar:{
        type: String,
        required: true,
        unique: true
    },
    registryno: { 
        type: String, 
        required: true,
        unique: true
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], 
        required: true 
    },
    dob: {
        type: String, 
        required: true 
    },
    medical_expertise: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6,
    },
    experience:{
        type: Number, 
        required: true
    },
    qualifications: {
        type: String, 
        required: true
    },        
    city: { 
        type: String, 
        required: true 
    },
    state: { 
        type: String, 
        required: true 
    },
    OPD: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'OPDs' 
    },
},
    {timestamps:true}
);

const DoctorModel = mongoose.model('Doctors', doctorSchema);

export default DoctorModel;
