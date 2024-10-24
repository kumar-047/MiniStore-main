import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchProductByIdQuery } from '../Slice/UserApiSlice'
import { useSelector,useDispatch } from 'react-redux';
import { addToCart } from '../Slice/cartSlice';
import {   useAddToCartMutation  } from '../Slice/cartApiSlice'; 
import UserNavbar from './UserNavbar';
import Footer from './Footer';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'; 

const MainProductPage = () => {
  const{ _id }=useSelector((state)=>state.auth.userInfo)
  const dispatch=useDispatch()
  const { productId } = useParams();

  const { data: product, error, isLoading } = useFetchProductByIdQuery(productId)
  const [addToCarts] = useAddToCartMutation();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error('Error fetching product details');
    return <div>Error loading product</div>;
  }

  

  const handleAddToCart = async()=>{
    
    if(!selectedSize){
      toast.error('Please select a size')
      return
    }

    const ProductData={
      userId:_id,
      productId:product._id,
      productName:product.productName,
      productPrice: product.productPrice,
      imageUrl: product.imageUrl,
      quantity: quantity,
      size: selectedSize,
    }
    try {
      await addToCarts(ProductData).unwrap();
      dispatch(addToCart(ProductData));
      toast.success('Product added to cart');
  } catch (error) {
      toast.error('Failed to add product to cart');
  }


    
  }

  return (
    <div>
      <UserNavbar />

      <section className="min-h-screen flex items-center justify-center mt-20 mb-24">
        <div className="bg-gray-100 flex flex-col md:flex-row rounded-2xl shadow-lg max-w-4xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <div className='m-4'>
              <h2 className="font-bold text-2xl text-[#002D74]">{product.productName}</h2>
              <p className="text-xs mt-4 text-[#002D74]">{product.productCategory}</p>
            </div>

            <div className="m-4">
              <p className="text-base text-black">
               {product.productDescription}
              </p>
            </div>
            <div className="m-4">
              <p className=" text-black font-bold text-2xl">
               ${product.productPrice}
              </p>
            </div>
            <div className='m-4'>
            <h1>Size</h1>
            </div>
            
            <div className="flex space-x-2 m-4">
            {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 text-sm font-medium border rounded-lg ${selectedSize === size ? 'bg-yellow-300' : ''}`}
                  onClick={() => setSelectedSize(size)} // Update selected size
                >
                  {size}
                </button>
              ))}
            </div>


            <form className="max-w-xs m-4">
              <label
                htmlFor="quantity-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Choose quantity:
              </label>
              <div className="relative flex items-center max-w-[8rem]">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="bg-blue-500 rounded-s-lg p-3 h-11 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  id="quantity-input"
                  className="h-11 text-center text-sm focus:outline-none w-full py-2.5 bg-blue-500 text-white"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.min(50, +prev + 1))}
                  className="bg-blue-500 rounded-e-lg p-3 h-11 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <div className="mt-9 m-4  ">
              <button
                type="button"
                onClick={handleAddToCart}
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add To Cart
              </button>
           
            </div>
          </div>

          
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <InnerImageZoom
                src={product.imageUrl}
                zoomSrc={product.imageUrl} 
                zoomType="hover" 
                zoomScale={1} 
                className="rounded-2xl"
                alt="Product"
              />

          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default MainProductPage;
