const User=require("../Model/UsersModel")
const Product=require("../Model/productModel")
const asyncHandler = require('express-async-handler')
const CryptoJS=require("crypto-js")
const generateToken=require('../utils/generateToken')



const registerUser = asyncHandler(async(req,res)=>{

    const {name,email,password,address,phone}=req.body

    const userExist =await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error("User already exists")
    }

    const user= await User.create({
        name,
        email,
        password: CryptoJS.AES.encrypt(password,process.env.PASS_KEY).toString(),
        address,
        phone
    })

    if(user){
        const token=generateToken(user._id,user.userType)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token
            })
    }

    else{
        res.status(400)
        throw new Error("Invalid user data")
    }
    
 
})

const authUser = asyncHandler(async(req,res)=>{
    console.log("Reached here")
    const {email,password}=req.body

        const user=await User.findOne({email})

        if(!user){
          res.status(400)
          throw new Error("Invalid email or password")
        }
        

        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_KEY);
        

        const originalPassword=hashedPassword.toString(CryptoJS.enc.Utf8)

       
        if(originalPassword !== password){
            res.status(400)
            throw new Error("Invalid Passwords")
        }

        const accessToken=generateToken(user._id,user.userType)

        const { password: _, ...others } = user._doc;
        console.log("User data (others):", others);

        res.status(201).json({
            message:"Login Successfully",
             user: others,
            accessToken,
        }) 
})

const getProfile = asyncHandler(async(req,res)=>{
    console.log(req.user)
    res.status(200).json(req.user)
})
const updateUser = asyncHandler(async(req,res)=>{
    if (req.user.id !== req.params.id) {
        return res.status(401).send('Unauthorized');
    }

    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const { password: _, ...others } = user._doc;
        res.status(200).json(others); 
    } catch (err) {
        res.status(500).json(err);
    }
});

const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({})
    if(!products){
        res.status(400)
        throw new Error("No products found")
    }
    else{
        res.status(200).json(products)
    }
})

const fetchproducts=asyncHandler(async(req,res)=>{
    const products=await Product.findById(req.params.productId)

    if(!products){
        res.status(400)
        throw new Error("Product No Found")
    }
    else{
        res.status(200).json(products)
    }
})

module.exports = {registerUser,authUser,updateUser,getProfile,getProducts,fetchproducts}