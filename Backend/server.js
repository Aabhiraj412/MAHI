//Packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// DataBase
import connectDB from './Database/connect.js';

// Routers
import authRouter from './Routers/auth.routes.js';
import profileRouter from './Routers/profile.routes.js';
import hospitalRouter from './Routers/hospital.routes.js';
import userRoute from './Routers/user.routes.js';
import doctorRoute from './Routers/doctor.routes.js';

dotenv.config({path: '../.env'});

const Port = process.env.PORT || 8000

const app = express();

app.listen(Port,()=>{
    connectDB();
    console.log(`Server is running at http://localhost:${Port}`)
})

app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use('/api/profile',profileRouter);

app.use('/api/hospital', hospitalRouter);
app.use('/api/user/', userRoute);
app.use('/api/doctor/', doctorRoute);
// app.get('*',(req,res)=>{
//     res.send('Invalid Domain');
// });
