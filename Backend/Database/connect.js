import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MongoDB_URI);
        console.log("Connected to Database");
    }
    catch(e){
        console.log("Error connecting to DataBase");
        console.log(e.message);
    }
}

export default connectDB;