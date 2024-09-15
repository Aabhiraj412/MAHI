import express from 'express';
import doctorProtectRoute from '../Middleware/doctorProtect.rout.js';
import { getPatients, removeFromQueue } from '../Controllers/Doctor Controllers/doctor.controller.js';

const router = express.Router();

router.get('/getPatients', doctorProtectRoute, getPatients);
router.post('/removeFromQueue', doctorProtectRoute, removeFromQueue);

export default router