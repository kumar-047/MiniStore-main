const Order=require("../Model/orderModel")
const Product=require("../Model/productModel")
const asyncHandler=require("express-async-handler")
const Razorpay = require("razorpay")
const { ObjectId } = require('mongodb');

const razorPay= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const reduceProductQuantity = asyncHandler(async(products)=>{
    
    for (let product of products){
        console.log("product in reduce:",product)
        const productIdObject = new ObjectId(product.productId);
        console.log("Converted id is",productIdObject)
        const dbProduct = await Product.findById(productIdObject)
        if(dbProduct){
        dbProduct.productQuantity -= product.quantity
        await dbProduct.save()
       }
    }
})

const createOrder=async(req,res)=>{
    console.log(req.body)
    try{
    const { userId, customerName, customerPhone, customerAddress, products, transactionId, amount, deliveryDate } = req.body


    const newOrder = await Order.create({
        userId,
        customerName,
        customerPhone,
        customerAddress,
        products,
        transactionId,
        amount,
    })
    await reduceProductQuantity(products)
    res.status(201).json(newOrder)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

const createPayment = async(req,res)=>{
    console.log("reached")

    const { amount,currency }=req.body
    console.log("amount is:",amount)
    console.log("Currency is:",currency)

    const options = {
        amount: amount,
        currency: currency,
    }

    try{
        const order = await razorPay.orders.create(options)
        res.status(201).json(order)
    }
    catch (error) {
        console.error("Error creating payment:", error);
        if (error.response) {
            console.error("Razorpay Error Response:", error.response.data);
        }
        res.status(400).json({ message: "Payment Creation Failed", error: error.message });
    }
    
    

}
const getOrder=asyncHandler(async(req,res)=>{
    const {userId}=req.params

    const orders=await Order.find({userId:userId})
    if(!orders){
        res.status(400)
        throw new Error("Order Not Found")
    }
    else{
        res.status(200).json(orders)
    }
})


module.exports={createOrder,createPayment,getOrder}