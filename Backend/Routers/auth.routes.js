import express from 'express';

import {userRegister} from '../Controllers/User Controllers/userAuth.controller.js';
import {userLogin} from '../Controllers/User Controllers/userAuth.controller.js';
import {userLogout} from '../Controllers/User Controllers/userAuth.controller.js';

import {doctorRegister} from '../Controllers/Doctor Controllers/doctorAuth.controller.js';
import {doctorLogin} from '../Controllers/Doctor Controllers/doctorAuth.controller.js';
import {doctorLogout} from '../Controllers/Doctor Controllers/doctorAuth.controller.js';

import {hospitalRegister} from '../Controllers/Hospital Controllers/hospitalAuth.controller.js';
import {hospitalLogin} from '../Controllers/Hospital Controllers/hospitalAuth.controller.js';
import {hospitalLogout} from '../Controllers/Hospital Controllers/hospitalAuth.controller.js';

const router = express.Router();

router.post('/userRegister',userRegister);
router.post('/userLogin',userLogin);
router.post('/userLogout',userLogout);

router.post('/doctorRegister',doctorRegister);
router.post('/doctorLogin',doctorLogin);
router.post('/doctorLogout',doctorLogout);

router.post('/hospitalRegister',hospitalRegister);
router.post('/hospitalLogin',hospitalLogin);
router.post('/hospitalLogout',hospitalLogout);

export default router;
