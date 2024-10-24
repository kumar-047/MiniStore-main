import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUpdateProductMutation, useFetchProductsQuery } from '../Slice/AdminApiSlice';
import pic1 from '/images/products.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../Service/firebase'

const ProductAdding = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!userInfo) {
      navigate('/Admin');
    }
  }, [userInfo, navigate]);

  const { productId } = useParams();
  const { data: products, isLoading: isFetching } = useFetchProductsQuery(); // Fetch all products
  const [updateProduct, { isLoading } ] = useUpdateProductMutation();

  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [image, setImage] = useState(null); // State for image upload

  useEffect(() => {
    if (products) {
      const product = products.find((p) => p._id === productId);
      if (product) {
        setProductName(product.productName);
        setProductCategory(product.productCategory);
        setProductDescription(product.productDescription);
        setProductPrice(product.productPrice);
        setProductQuantity(product.productQuantity)

      }
    }
  }, [products, productId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';

    if (image) {
      const storageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      // Handle Firebase file upload
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress can be monitored here if necessary
        },
        (error) => {
          console.error('Error uploading image:', error);
          toast.error('Failed to upload image');
        },
        async () => {
          imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Image available at:', imageUrl);

          // Proceed with updating the product once the image is uploaded
          submitProduct(imageUrl);
        }
      );
    } else {
      // If no new image is selected, proceed with the update using the existing image
      submitProduct(products.imageUrl);
    }
  };

  const submitProduct = async(imageUrl)=>{
    const formData = {
      productName: productName,
      productCategory: productCategory,
      productDescription: productDescription,
      productPrice: productPrice,
      imageUrl: imageUrl,
      productQuantity: productQuantity
    }
    try {
      await updateProduct({id:productId,data:formData}).unwrap()
      toast.success('Product updated successfully');
      navigate('/Admin/ProductTable');
      window.location.reload();
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      }
  }

  return (
    <div>
      <h1 className='font-semibold underline text-2xl mb-10'>Product Updation</h1>

      <section className="min-h-screen flex items-center justify-center mb-24">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Updating Product</h2>
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
                type="number"
                name="productPrice"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
               <input
                className="p-2 rounded-xl border bg-white"
                type="number"
                name="productPrice"
                placeholder="Product Price"
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
                accept="image/*"
                onChange={handleImageChange}
              />

              <button
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Updating....' : 'Update Product'}
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

export default ProductAdding;
