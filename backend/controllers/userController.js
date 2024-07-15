import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req,res)=>{
    try {
        const {fullname, password, confirmPassword, username, gender} = req.body;

        if(!fullname || !password || !confirmPassword || !username || !gender){
            return res.status(400).json({message : "Please enter all fields"})
        }

        if(password.length < 6){
            return res.status(400).json({message : "Password should be atleast 6 character long"})
        }

        if(password !== confirmPassword){
            return res.status(400).json({message : "Please enter correct Password"})
        }

        const user  = await User.findOne({username})

        if(user){
            return res.status(400).json({message : "Username already taken"})
        }

        //create user

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await User.create({ username, fullname, password : hash, gender,  profilePhoto : gender === "male"? maleProfilePhoto : femaleProfilePhoto})

        return res.status(200).json({message:"Account created successfully", success:true})

    } catch (error) {
        console.log(error)
    }
}

export const login = async (req,res)=>{
    try {
        const {username , password} = req.body;

        if( !password || !username ){
            return res.status(400).json({message : "Please enter all fields"})
        }
        
        const oldUser = await User.findOne({username})
        if(!oldUser){
            return res.status(400).json({message: "Invalid username or password", success : false})
        }

        const isPasswordCorrect = await bcrypt.compare(password,oldUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid username or password", success : false})
        }

        const token = jwt.sign({userId : oldUser._id},process.env.SECRET_KEY,{expiresIn:"1d"})

        res.cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:"strict"})

        return res.status(200).json({
            _id : oldUser._id,
            username,
            profilePhoto : oldUser.profilePhoto,
            fullname : oldUser.fullname
        })

    } catch (error) {
        console.log(error)
    }
}

export const logout = (req,res)=>{
    try {
        res.status(200).cookie("token","").json({message: "You logged out succesfully"})
    } catch (error) {
        console.log(error)
    }
}

export const getOtherUsers = async (req,res)=>{
    try {
        const loggedUserId = req.id
        const otherUserId = await User.find({_id : { $ne : loggedUserId }}).select("-password")
        return res.status(200).json(otherUserId)
    } catch (error) {
        console.log(error)
    }
}

