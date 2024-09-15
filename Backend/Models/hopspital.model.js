import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DOE:{
        type: String,
        required: true,
    },
    registryno:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    beds_in_use: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'General_Ward', 
    }],
    bed_in_use:[{
        type: Number
    }],
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
    }],
    total_beds_available: { 
        type: Number, 
        required: true 
    },
    helpline: { 
        type: String, 
        required: true,
        unique: true
    },
    //
    doctors: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctors' 
    }],
    address: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    state:{
        type: String,
        required: true
    },
    OPDs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OPDs', 
    }],
    OPD_names: [{
        type: String, 
    }]
},
    {timestamps: true}
);

const HospitalModel = mongoose.model('Hospitals', hospitalSchema);

export default HospitalModel;
