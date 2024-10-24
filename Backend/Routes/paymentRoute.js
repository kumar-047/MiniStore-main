const Router = require("express").Router()
const { createOrder,createPayment,getOrder }=require("../Controller/orderController")
const protect = require("../middleware/authMiddleware")


Router.post("/createorder",createOrder)
Router.post("/createpayment",createPayment)
Router.get("/:userId",getOrder)

module.exports=Router