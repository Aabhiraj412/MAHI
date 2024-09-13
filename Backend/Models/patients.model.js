import mongoose from "mongoose";

const patientsSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users' 
    },
    discharge: { 
        type: Date,
        default: null 
    },
},  {timestamps: true}

);

const PatientsModel = mongoose.model('Patients', patientsSchema);
export default PatientsModel;
