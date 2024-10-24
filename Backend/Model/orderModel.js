const { type } = require("express/lib/response")
const { Transaction } = require("mongodb")
const mongoose=require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
    customerName:{
        type:String,
        required:true,
    } ,
    customerPhone:{
        type:String,
        required:true,
    },
    customerAddress:{
        type:String,
        required:true,
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            productName:{
                type:String,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
        },
    ],
    transactionId:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    deliveryDate: {
        type: Date,
        default: () => new Date(+new Date() + 7*24*60*60*1000), // Delivery date 7 days from now
      },

},{timestamps:true})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order