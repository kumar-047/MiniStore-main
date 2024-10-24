import React, { useState,useEffect } from 'react';
import pic1 from '/images/products.jpg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../Service/firebase';
import { useProductAddMutation } from '../Slice/AdminApiSlice'

const ProductRegistration = () => {

  const navigate=useNavigate()

  const {userInfo}=useSelector((state)=>state.auth)

  useEffect(()=>{
    if(!userInfo){
      navigate('/Admin')
    }
  },[userInfo,navigate])

  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity,setProductQuantity]=useState('')
  const [image, setImage] = useState(null); // State for image upload
  const [isLoading, setIsLoading] = useState(false); // State for loading
  
  const [register]=useProductAddMutation()


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (image) {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.error('Image upload failed:', error);
          toast.error('Image upload failed');
          setIsLoading(false);
        },
        async () => {
          // On successful upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Submit the product details along with the image URL
          await register({
            productName,
            productCategory,
            productDescription,
            productPrice,
            productQuantity,
            imageUrl: downloadURL, // Store Firebase image URL
          }).unwrap();
           navigate('/Admin')
          toast.success('Product registered successfully!');
          setIsLoading(false);
        }
      );
    } else {
      toast.error('Please select an image');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className='font-semibold underline text-2xl'>Product Adding</h1>
    
      <section className="min-h-screen flex items-center justify-center mb-24">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Register Product</h2>
            <p className="text-xs mt-4 text-[#002D74]">If you have any queries, contact support.</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="p-2 mt-8 rounded-xl border bg-white"
                type="text"
                name="productName"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />

              <input
                className="p-2 rounded-xl border bg-white"
                type="text"
                name="productCategory"
                placeholder="Product Category"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
              />

                <input
                className="p-2 rounded-xl border bg-white"
                type="text"
                name="productPrice"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />

              <input
                className="p-2 rounded-xl border bg-white"
                type="number"
                name="productQuantity"
                placeholder="Product Quantity"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                required
              />

              <textarea
                className="p-2 rounded-xl border resize-none bg-white"
                name="productDescription"
                placeholder="Product Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />

              <input
                className="p-2 rounded-xl border bg-white"
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />


              <button
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Product'}
              </button>
            </form>
          </div>

          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={pic1} alt="Product Registration" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductRegistration;
