const  Cart = require("../Model/cartModel")
const asyncHandler=require("express-async-handler")
const ObjectId = require('mongodb').ObjectId;

const getCart = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    console.log("cart Userid :", userId);

    const cart = await Cart.findOne({ userId });
    console.log("Fetched Cart:", cart); // Add this line to log the cart

    if (cart) {
        res.status(200).json(cart);
    } else {
        res.status(400);
        throw new Error("Cart Was Empty");
    }
});


const addToCart = asyncHandler(async (req, res) => {
    console.log("Reached");
    
    const { userId, productId, productName, productPrice, imageUrl, quantity, size } = req.body;
    
    console.log('Received data:', { userId, productId, productName, productPrice, imageUrl, quantity, size });
    
    try {
       
        let cart = await Cart.findOne({ userId });

        // Create a new cart if one doesn't exist
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Find the index of the existing item in the cart
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex >= 0) {
            // Update quantity if item already exists in the cart
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Push new item to cart
            cart.items.push({ productId, productName, productPrice, imageUrl, quantity, size });
        }

        // Update total quantity and amount
        cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
        cart.totalAmount = cart.items.reduce((total, item) => total + item.productPrice * item.quantity, 0);

        // Save the updated cart
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (error) {
        console.error('Error saving cart:', error);
        res.status(500).json({ message: 'Failed to update cart', error: error.message });
    }
});




const removeFromCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params;
    console.log("user id in remove function", userId);
    console.log("product id in remove function", productId);

    const cart = await Cart.findOne({ userId });

    if (cart) {
        try {
            console.log('Cart before removal:', cart.items);
            const objectIdProductId = new ObjectId(productId);

            console.log("objectids:", objectIdProductId)

            cart.items = cart.items.filter(item => {
                console.log("Comparing with:", item.productId);
                return !item.productId.equals(objectIdProductId);
            });

            await cart.save();
            res.status(200).json({ success: true, message: 'Product removed from cart', cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error removing product from cart' });
        }
    } else {
        res.status(404).json({ success: false, message: 'Cart not found' });
    }
});
module.exports={ addToCart,removeFromCart,getCart }
