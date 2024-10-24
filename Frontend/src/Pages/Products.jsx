import React,{useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserNavbar from '../Components/UserNavbar'
import ProductPage from '../Components/ProductPage'
const Products = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    // Redirect to home if userInfo is not available
    if (!userInfo) {
      navigate('/'); // Redirect to the homepage
    }
  }, [userInfo, navigate]); 
  
  return (
    
    <div>
        <UserNavbar />
        <ProductPage />
      
    </div>
  )
}

export default Products
