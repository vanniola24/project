import validator from 'validator'
import bycrpt from "bcrypt"
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'


//api to register user
const registerUser = async (req,res) => {
    try {
        const{name,email,password} =req.body

        if(!name || !email || !password){
            return res.json({success:false,message:"missing details"})
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"enter a valid email"})
            
        }

        //validating password

        if (password.length <8) {
            return res.json({success:false,message:"enter a strong password"})
            
        }

        //hashed user password
        const salt = await bycrpt.genSalt(10)
        const hashedPassword = await bycrpt.hash(password, salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = new userModel(userData)
        const user =  await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})


        


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api for userlogin

const loginUser = async (req,res) => {
    try {
        const {email,password}= req.body
        const user =  await userModel.findOne({email})


        if (!user) 
            {
                return res.json({success:false,message:'User does not exist'})
        }

        const isMatch = await bycrpt.compare(password,user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token})
            
        }
        else
        {
            return res.json({success:false,message:'invalid credentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export {registerUser,loginUser}