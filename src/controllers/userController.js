const User =require('../models/userModel')
const generateToken = require('../utils/generateToken')

const authUser = async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user && (await user.matchPassword(password))) {
            res.json({success:true,message:'Successfully LoggedIn',data:{_id: user._id,name: user.name,email: user.email,token: generateToken(user._id)}})
        } else {
            throw new Error('Invalid email or password')
        }
    }catch(e){
        console.log(e)
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to login'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}

const registerUser =async (req, res) => {
    try{
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })
            if (userExists) {
                throw new Error('User already exists')
            }
            const user = await User.create({
                name,
                email,
                password,
            })
            if(user){
                res.status(201).json({success:true,message:'Successfully Registered',data:{_id: user._id,name: user.name,email: user.email,token: generateToken(user._id)}})
            }else{
                throw new Error('Invalid user data')
            }
    }
    catch(e){
        console.log(e)
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to register'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}

module.exports={authUser,registerUser}