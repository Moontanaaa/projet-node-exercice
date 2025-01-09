import Users from "../models/Users.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body
    console.log(req.body)
    try{
        const emailVerification = await Users.findOne({email})
        if(emailVerification){
            return res.json({message : 'Email already taken'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = await Users.create({
            first_name, 
            last_name,
            email,
            password : hashedPassword
        })
        return res.json({message : `Welcome ${newUser.first_name}`})
    }
    catch(err){
        return res.status(500).json({message : 'Internal server error'})
    }
}


export const loginUser = async (req, res ) => {
    const {email, password} = req.body
    try{
        const user = await Users.findOne({email})
        if(!user){
            return res.json({message : 'Email or password invalid'})
        }
        const passwordVerification = await bcrypt.compare(password, user.password)
        if(!passwordVerification){
            return res.json({message : 'Email or password invalid'})
        }
        const token = jwt.sign({user_id : user._id}, process.env.JWT_SECRET)
        return res.json(token)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : 'Internal server error'})
    }
}