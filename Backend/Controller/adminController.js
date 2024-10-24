const Admin = require("../Model/adminModel")
const Users = require("../Model/UsersModel")
const asyncHandler = require('express-async-handler')
const CryptoJS = require("crypto-js")
const generateToken = require("../utils/generateToken")
const Order = require("../Model/orderModel")

const registerAdmin = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    const userExist = await Admin.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("User Already Exist")
    }
    const user=await Admin.create({
        name,
        email,
        password:CryptoJS.AES.encrypt(password,process.env.PASS_KEY).toString(), 
    })

    if(user){
        const token = generateToken(user._id,user.userType)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token   
        })
        
    }
    else{
        res.status(400)
        throw new Error("Failed to Register")
    }
})
const authAdmin= asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user = await Admin.findOne({email})
    if(!user){
        res.status(400)
        throw new Error("User Not Found")
    }
    const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_KEY)
    const originalPassword=hashedPassword.toString(CryptoJS.enc.Utf8)
    if(password!==originalPassword){
        res.status(400)
        throw new Error("Invalid passwords")
    }
    const accessToken = generateToken(user._id,user.userType)
    const { password: _, ...others } = user._doc;
        console.log("User data (others):", others);
    res.status(201).json({
        message:"Login Successfully",
        user:others,
        accessToken
    })
})

const updateAdmin = asyncHandler(async(req,res)=>{
    if(req.user.id!=req.params.id){
        res.status(400)
        throw new Error9("Unauthorised")
    }
    if(req.body.password){
        const hashedPassword=CryptoJS.AES.encrypt(req.body.password,process.env.PASS_KEY).toString()
        req.body.password=hashedPassword
    }
    try {
        const user = await Admin.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!user){
            res.status(400)
            throw new Error("User Not Found")
        }
    
         const { password: _, ...others } = user._doc;
         res.status(200).json(others);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
    
})
const getAllCustomers=asyncHandler(async(req,res)=>{
    const users = await Users.find()
    res.status(200).json(users)
  })
  
const getAllOrders=asyncHandler(async(req,res)=>{
    const orders = await Order.find()
    res.status(200).json(orders)
})

module.exports = {registerAdmin,authAdmin,updateAdmin,getAllCustomers,getAllOrders};