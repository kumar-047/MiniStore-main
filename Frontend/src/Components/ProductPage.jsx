import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useFetchProductsQuery } from '../Slice/UserApiSlice'
import { useSelector } from 'react-redux';
import { FaRegEye } from "react-icons/fa";
import Footer from './Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {

  const { data: products, error, isLoading } = useFetchProductsQuery()
  const {searchTerm}=useSelector((state)=>state.auth)

   if (isLoading) return <p>Loading...</p>;
   if (error) return <p>Error loading products</p>;

   const filteredProducts = searchTerm
   ? products?.filter((product) =>
       product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.productCategory.toLowerCase().includes(searchTerm.toLowerCase())
     )
   : products;
   const handleAddToCart = () => {
      toast.error('Please select a size and quantity.');
  }

  return (
    <div>
    <div className='px-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
    {filteredProducts?.map((product) => (
          <div key={product._id} className="card card-compact bg-gray-100 w-full h-96 shadow-xl mb-10">
            <figure className="relative group">
              <img
                className='w-full h-full object-contain'
                src={product.imageUrl}
                alt={product.productName}
              />
              <Link 
                to={`/product/${product._id}`} 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <FaRegEye className="text-white text-4xl" />
              </Link>
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg">{product.productName}</h2>
              <p className='text-gray-500 font-semibold mb-5'>{product.productCategory}</p>
              <div className="card-actions justify-center">
                <button className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handleAddToCart()} >
                  
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      
    </div>
    <Footer/>
    </div>
  );
}

export default ProductPage;
