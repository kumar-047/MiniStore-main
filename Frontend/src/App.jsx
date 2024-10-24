import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import UserRegistration from './Components/UserRegistration';
import UserLogin from './Components/UserLogin';
import UserProfile from './Components/UserProfile';
import MainProductPage from './Components/MainProductPage';
import Products from './Pages/Products';
import Cart from './Components/Cart';
import Orders from './Components/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const userName = 'User';
  return (
    <Router>
    <div className="h-screen bg-white text-black " style={{ overflowX: 'hidden' }}>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/product/:productId" element={<MainProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
    </div>
    </Router>
  )
}

export default App
