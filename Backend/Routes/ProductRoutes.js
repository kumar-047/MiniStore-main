const Router = require("express").Router()
const { productAdding,getAllProducts,deleteProduct,updateProduct } = require("../Controller/productController")
const protect = require("../middleware/authMiddleware")



  Router.post('/addproduct',productAdding)
  Router.get('/getproducts',getAllProducts)
  Router.delete('/deleteproduct/:id',deleteProduct)
  Router.put('/updateProduct/:id',updateProduct)
  module.exports = Router