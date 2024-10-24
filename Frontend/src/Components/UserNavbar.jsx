import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials, setSearchTerm } from '../Slice/authSlice';
import Logo from '/images/logo.png';
import User from '/images/user.png';
import { IoSearch } from "react-icons/io5";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const UserNavbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth) || {};
  const userName = userInfo ? userInfo.name : 'User';
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const {totalQuantity} = useSelector((state) => state.cart); 
  console.log('Cart Items:', cartItems);
  console.log('Total items in cart:', totalQuantity);

  const subtotal = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchInput(searchValue);
    dispatch(setSearchTerm(searchValue));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate('/login');
  };

  

  return (
    <div className="navbar bg-gray-100">
      <div className="flex justify-between items-center w-full px-4 py-2 md:px-8 md:py-4">
        {/* Logo */}
        <div className="flex-none">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-xl text-gray-600"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu: Search Bar and User Icon */}
        <div className={`hidden md:flex flex-1 items-center justify-center`}>
          <div className="relative flex items-center">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              className="w-72 h-10 p-2 pl-4 pr-12 border border-gray-400 bg-white rounded"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 hover:text-gray-900 transition"
            >
              <IoSearch />
            </button>
          </div>
        </div>

        {/* User Icon Dropdown */}
        <div className={`hidden md:flex items-center`}>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator" onClick={goToCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{totalQuantity}</span> {/* Updated badge count */}
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold text-info">{totalQuantity} Items</span>
                <span className="text-info">Subtotal:{subtotal} </span>
                <div className="card-actions">
                  <Link to="/cart">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-6 rounded-full">
                <img
                  alt="User Avatar"
                  src={User}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <p className='font-semibold text-lg'>{userName}</p>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
              <Link to="/orders">Orders</Link>

              </li>
              <li>
                <button onClick={handleLogout} >Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center w-full bg-gray-100 py-4 absolute top-16 left-0 z-10">
          <div className="w-full flex justify-center mb-4">
            <div className="relative flex items-center w-3/4">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchChange}
                className="w-full h-10 p-2 pl-4 pr-12 border border-gray-400 bg-white rounded"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 hover:text-gray-900 transition"
              >
                <IoSearch />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="relative flex items-center mb-4" onClick={goToCart} role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800 hover:text-gray-900 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">{totalQuantity}</span>
            </div>
            <div className="dropdown dropdown-end mb-4">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={User}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <p className='font-semibold text-lg'>{userName}</p>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                 <li>
              <Link to="/orders">Orders</Link>

              </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
