import DoctorModel from "../../Models/doctor.model.js";
import HospitalModel from "../../Models/hopspital.model.js";

const addDoctor = async (req, res) => {
    try {
        const {registryno} = req.body;

        if (!registryno) {
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const doctor = await DoctorModel.findOne({registryno});
        
        if(!doctor){
            return res.status(400).json({message: "Doctor not found"});
        }
        
        if(doctor.hospital){
            return res.status(400).json({message: "Doctor already associated with a anothre hospital"});
        }

        const hospital = req.hospital;
        
        if(hospital.doctors.includes(doctor._id)){
            return res.status(400).json({message: "Doctor already exists"});
        }

        hospital.doctors.push(doctor._id);

        await HospitalModel.updateOne({_id: hospital._id}, hospital);

        doctor.hospital = hospital._id;

        await DoctorModel.updateOne({_id: doctor._id}, doctor);

        res.status(200).json({message: "Doctor added successfully"});

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
        console.log("Error in Add Doctor Controller");
        console.log(error.message);
    }
}

export default addDoctor;