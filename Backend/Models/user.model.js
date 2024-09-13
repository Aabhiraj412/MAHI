import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    email:{
        type: String,
        required: true,
        unique: true
    },
    aadhar:{
        type: String,
        required: true,
        unique: true
    },
    DOB: { 
        type: String, 
        required: true 
    },
    profile_pic: {
        type: String,
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], 
        required: true 
    },
    status: { 
        type: String,
        enum: ['Normal', 'Admitted'], 
        default: "Normal" 
    },
    medical_reports: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Med_History',
    }],
    fathers_name: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6
    },
    weight: { 
        type: Number, 
        required: true 
    },
    address: { 
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
    }
},
    {timestamps: true}
);

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;