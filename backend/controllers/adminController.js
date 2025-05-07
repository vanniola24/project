import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary}from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'

//api  for adding doctor
const addDoctor= async (req,res)=>{
    try {

        const {name,email,password,speciality,degree,experience,about,fee,adress} = req.body
        const imageFile = req.file

       //checking for all data to add doctor
       if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !adress)
       {
        return res.json({success:false,message: "Missing details"})
       }


       //validating email format
       if (!validator.isEmail(email)) {
        return res.json({success:false,message: "Please enter a valid email"})
       }

       // validating strong password
       if (password.length < 8) {
        return res.json({success:false,message: "please enter a strong password"})
       }

    //hashing doctor password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //upload image to cloudinary
    if (!imageFile) {
        return res.json({success:false,message: "Doctor image is required"})
    }
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"}) 
    const imageUrl = imageUpload.secure_url

    // Parse and validate availability slots
    const availability = new Map();
    if (req.body.availability) {
      try {
        const slotsData = typeof req.body.availability === 'string' 
          ? JSON.parse(req.body.availability) 
          : req.body.availability;
        
        for (const [date, times] of Object.entries(slotsData)) {
          if (Array.isArray(times)) {
            availability.set(date, times);
          }
        }
      } catch (error) {
        console.error('Error parsing availability slots:', error);
      }
    }

    const doctorData = {
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fee,
        adress: typeof adress === 'string' ? JSON.parse(adress) : adress,
        date: new Date().getTime(),
        availability
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()
    res.json({success:true,message:"Doctor Added"})

   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
        
    }
}
//API for admin login
const loginAdmin= async (req,res) => {
    try {
        const {email,password} = req.body
        if (email ===process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email: process.env.ADMIN_EMAIL },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
        
    } catch (error) {
        console.log(error)
    res.json({success:false,message:error.message})
        
    }

}
//api to get all doctors list for admin panel
const allDoctors = async (req,res) => {
    try {

        const doctors = await  doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}
export {addDoctor,loginAdmin,allDoctors}