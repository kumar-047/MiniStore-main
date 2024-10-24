import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Pages/Home';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';
import AdminPage from './Components/AdminPage';
import AdminProfile from './Components/AdminProfile';
import CustomerTable from './Components/CustomerTable';
import OrdersTable from './Components/OrdersTable';
import ProductRegistration from './Components/ProductRegistration';
import ProductTable from './Components/ProductTable';
import ProductAdding from './Components/ProductsAdding';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const {userInfo}= useSelector((state)=>state.auth)
  const userName = userInfo?.name || 'User';
  return (
    <Router>
    <div className="h-screen bg-white text-black " style={{ overflowX: 'hidden' }}>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/Admin" element={<AdminPage />} >
          <Route index element={<div className="m-3 text-xl text-black font-semibold">Welcome {userName},</div>} />
          <Route path="Adminprofile" element={<AdminProfile />} />
          <Route path="CustomerTable" element={<CustomerTable />} />
          <Route path="OrdersTable" element={<OrdersTable />} />
          <Route path="ProductRegister" element={<ProductRegistration/>} />
          <Route path="ProductTable" element={<ProductTable />} />
          <Route path="ProductAdding/:productId" element={<ProductAdding />} />
          </Route>
        </Routes>
    </div>
    </Router>
  )
}

export default App
