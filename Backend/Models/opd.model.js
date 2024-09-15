import mongoose from "mongoose";

const opdSchema = new mongoose.Schema({
    array: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users' 
    }],
    doctors: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctors' 
    }],
    name: { 
        type: String, 
        required: true 
    },
    total_slots: { 
        type: Number, 
        required: true 
    }
});

const OPDModel = mongoose.model('OPDs', opdSchema);

export default OPDModel;
