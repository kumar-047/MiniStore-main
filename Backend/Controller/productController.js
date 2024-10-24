const Products=require('../Model/productModel')
const asyncHandler=require("express-async-handler")


const productAdding=asyncHandler(async(req,res)=>{
    const { productName, productCategory, productDescription, productPrice, productQuantity,imageUrl } = req.body;

    const newProduct = new Products({
        productName,
        productCategory,
        productDescription,
        productPrice,
        productQuantity,
        imageUrl,
      });
      await newProduct.save()
      
      if(newProduct){
        res.status(201).json({
            message: "Product Added Successfully",
            product: newProduct
            })
      }
      
      else{
        res.status(400).json({
            message: "Failed to add product"
            })
      }
})  

const getAllProducts=asyncHandler(async(req,res)=>{
  const products = await Products.find()
  res.status(200).json(products)
})

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Products.findByIdAndDelete(productId);

  if (!product) {
      return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product removed' });
});

const updateProduct=asyncHandler(async(req,res)=>{
  console.log('Received Data:', req.body); 
  const productId=req.params.id
  console.log("Product ID is:",productId)
  
  const product=await Products.findById(productId)
  if(!product){
    res.status(400)
    throw new Error("Products not found")
  }
  
   product.productName = req.body.productName
   product.productDescription = req.body.productDescription
   product.productPrice = req.body.productPrice
   product.productQuantity = req.body.productQuantity
   product.productCategory = req.body.productCategory

   if (req.body.imageUrl) {
    product.imageUrl = req.body.imageUrl;
  }

   const updateProduct=await product.save()
   res.status(200).json(updateProduct)
})


module.exports={productAdding,getAllProducts,deleteProduct,updateProduct}
