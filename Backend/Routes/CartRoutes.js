const Router=require('express').Router()
const {addToCart,removeFromCart,getCart} = require("../Controller/cartController")

Router.get('/:userId', getCart);
Router.post('/add', addToCart);
Router.post('/remove/:userId/:productId', removeFromCart);

module.exports= Router