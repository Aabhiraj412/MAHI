import express from 'express';

import { userProfile, userProfileDetails } from '../Controllers/User Controllers/userAuth.controller.js';
import { doctorProfile, doctorProfileDetails } from '../Controllers/Doctor Controllers/doctorAuth.controller.js';
import { hospitalProfile, hospitalProfileDetails } from '../Controllers/Hospital Controllers/hospitalAuth.controller.js';

import userProtectRoute from '../Middleware/userProtect.rout.js';
import doctorProtectRoute from '../Middleware/doctorProtect.rout.js';
import hospitalProtectRoute from '../Middleware/hospitalProtect.rout.js';

import { updateMedHistory, medHistoryDetails } from '../Controllers/User Controllers/medHistory.controller.js';
import { prevCases } from '../Controllers/Doctor Controllers/prevCases.controller.js';

const router = express.Router();

router.get('/user',userProtectRoute,userProfile);
router.get('/doctor',doctorProtectRoute,doctorProfile);
router.get('/hospital',hospitalProtectRoute,hospitalProfile);

router.get('/user/:_id',userProfileDetails);
router.get('/doctor/:_id', doctorProfileDetails);
router.get('/hospital/:_id', hospitalProfileDetails);

router.get('/medhistory/:_id',medHistoryDetails);

router.post('/user/medhistory',userProtectRoute,updateMedHistory);
router.post('/doctor/prev_cases',doctorProtectRoute,prevCases);


export default router;