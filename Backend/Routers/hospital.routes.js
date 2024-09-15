import express from 'express';

import addDoctor from '../Controllers/Hospital Controllers/addDoctor.controller.js';
import hospitalProtectRoute from '../Middleware/hospitalProtect.rout.js';
import {admitPatient, patientDetails} from '../Controllers/Hospital Controllers/patient.controller.js';
import { dischargePatient } from '../Controllers/Hospital Controllers/patient.controller.js';
import { addOPD, opdDetails, addOPDDoctor } from '../Controllers/Hospital Controllers/opd.controller.js';

const router = express.Router();

router.post('/add_doctor', hospitalProtectRoute, addDoctor);
router.post('/admit_patient', hospitalProtectRoute, admitPatient);
router.post('/discharge_patient', hospitalProtectRoute, dischargePatient);
router.post('/addOPD', hospitalProtectRoute, addOPD);
router.post('/opd/addDoctor', hospitalProtectRoute, addOPDDoctor);

router.get('/patient/:_id',patientDetails);
router.get('/opddetails/:_id',opdDetails);
export default router;