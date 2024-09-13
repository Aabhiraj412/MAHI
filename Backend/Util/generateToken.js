import jwt from 'jsonwebtoken';

export const generateUserToken = (user,res)=>{
    const token = jwt.sign({user}, process.env.JWT_User, { 
        expiresIn: '15d' 
    });
    res.cookie('jwt', token,{
        maxAge:15*24*60*60*1000,  //15days
        httpOnly: true,
        sameSite: 'strict',  //for https only
        secure: process.env.NODE_ENV !== 'development'
    });
}

export const generateDocToken = (user,res)=>{
    const token = jwt.sign({user}, process.env.JWT_Doct, { 
        expiresIn: '15d' 
    });
    res.cookie('jwt', token,{
        maxAge:15*24*60*60*1000,  //15days
        httpOnly: true,
        sameSite: 'strict',  //for https only
        secure: process.env.NODE_ENV !== 'development'
    });
}

export const generateHospToken = (user,res)=>{
    const token = jwt.sign({user}, process.env.JWT_Hosp, { 
        expiresIn: '15d' 
    });
    res.cookie('jwt', token,{
        maxAge:15*24*60*60*1000,  //15days
        httpOnly: true,
        sameSite: 'strict',  //for https only
        secure: process.env.NODE_ENV !== 'development'
    });
}