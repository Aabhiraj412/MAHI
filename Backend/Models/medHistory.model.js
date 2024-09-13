import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema({
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctors' 
    },
    medical_condition: { 
        type: String, 
        required: true 
    },
    reports: [{
        type: String,
    }]
},
    {timestamps: true}
);

const MedicalModel = mongoose.model('Med_History', medicalHistorySchema);

export default MedicalModel;