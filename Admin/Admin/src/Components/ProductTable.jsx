import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchProductsQuery,useDeleteProductMutation } from '../Slice/AdminApiSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductTable = () => {
  const navigate = useNavigate();
  const {userInfo}=useSelector((state)=>state.auth)
  useEffect(()=>{
    if(!userInfo){
      navigate('/Admin')
    }
  },[userInfo,navigate])
  
  const { data: products, isLoading, isError,refetch  } = useFetchProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleEditClick = (productId) => {
    // Navigate to the edit page with the specific productId
    navigate(`/Admin/ProductAdding/${productId}`);
  };

  const handleDeleteClick = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId).unwrap();
        toast.success("Product Deleted SuccessFully")
        refetch();
      } catch (error) {
        console.error('Failed to delete the product', error);
        toast.error('Failed to delete the product');
      }
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl underline mb-10">Product Table</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="overflow-y-auto max-h-[500px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>

              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Remove</th>
              <th scope="col" className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
          {products && products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img src={product.imageUrl} className="w-16 md:w-32 max-w-full max-h-full" alt={product.productName} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4">{product.productCategory}</td>
                  <td className="px-6 py-4">{product.productQuantity}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white ">
                    {product.productDescription}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${product.productPrice}
                  </td>
                  <td className="px-6 py-4">
                  <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      {isDeleting ? 'Deleting...' : 'Remove'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEditClick(product._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
