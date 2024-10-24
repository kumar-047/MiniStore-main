
const Router=require("express").Router()
const {registerUser,authUser,updateUser,getProfile,getProducts,fetchproducts}=require("../Controller/userController")
const protect = require("../middleware/authMiddleware")



Router.post('/register',registerUser)
Router.post('/login',authUser)   
Router.put('/profile/:id',protect,updateUser)
Router.get('/getproducts',getProducts)
Router.get('/fetchproduct/:productId',fetchproducts)
module.exports=Router