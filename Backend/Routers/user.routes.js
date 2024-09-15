import express from 'express';
import { getInQueue, viewHospitals } from '../Controllers/User Controllers/user.controller.js';
import userProtectRoute from '../Middleware/userProtect.rout.js';

const router = express.Router();

router.get('/hospitals', viewHospitals);
router.post('/getInQueue',userProtectRoute ,getInQueue);

export default router;