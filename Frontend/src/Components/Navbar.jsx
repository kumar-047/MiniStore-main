import React, { useState } from 'react';
import Logo from '/images/logo.png';
import { IoSearch } from "react-icons/io5";
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showSignupDropdown, setShowSignupDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showMobileSignupDropdown, setShowMobileSignupDropdown] = useState(false);
  const [showMobileLoginDropdown, setShowMobileLoginDropdown] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    toast.info('Please log in first');
  };

  const handleCartClick = () => {
    toast.info('Please login first');
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSignupDropdown = () => {
    setShowSignupDropdown(!showSignupDropdown);
  };

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  const toggleMobileSignupDropdown = () => {
    setShowMobileSignupDropdown(!showMobileSignupDropdown);
  };

  const toggleMobileLoginDropdown = () => {
    setShowMobileLoginDropdown(!showMobileLoginDropdown);
  };

  return (
    <div className='bg-gray-100'>
      <div className='p-5 flex justify-between items-center'>
        {/* Logo Container */}
        <div className='flex items-center'>
          <img src={Logo} alt='Logo' className='h-10' />
        </div>
        
        {/* Desktop Menu */}
        <div className='hidden md:flex flex-1'>
          <div className='relative flex items-center justify-center flex-1'>
            <input 
              type='search'
              placeholder='Search'
              value={searchTerm}
              onChange={handleSearchChange}
              className='w-1/2 h-10 p-2 pl-4 pr-12 border border-gray-400 bg-white rounded mr-5' 
            />
            <button 
              type='button'
              className='absolute left-3/4 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 hover:text-gray-900 transition'
              onClick={handleSearchClick}
            >
              <IoSearch />
            </button>
          </div>
          <div className='flex items-center space-x-4 ml-4'>
            <Link to='/' className='text-blue-600 hover:underline font-medium'>Home</Link>
            <div className="relative">
              <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center" onClick={toggleSignupDropdown}>
                Signup
                <FaAngleDown className="ml-2" />
              </button>

              {/* Signup Dropdown menu */}
              {showSignupDropdown && (
                <div className="absolute mt-2 bg-gray-200 rounded-lg shadow w-32 z-50">
                  <ul className="text-sm text-gray-700">
                    <li>
                      <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">User</Link>
                    </li>
                    
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center" onClick={toggleLoginDropdown}>
                Login
                <FaAngleDown className="ml-2" />
              </button>

              {/* Login Dropdown menu */}
              {showLoginDropdown && (
                <div className="absolute mt-2 bg-gray-200 rounded-lg shadow w-32 z-50">
                  <ul className="text-sm text-gray-700">
                    <li>
                      <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">User</Link>
                    </li>
                    
                  </ul>
                </div>
              )}
            </div>
            {/* Add to Cart Icon - Desktop */}
            <div className='relative flex items-center'onClick={handleCartClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800 hover:text-gray-900 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">0</span>
            </div>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className='md:hidden text-gray-600 hover:text-gray-900'
          onClick={toggleMenu}
        >
          {showMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className='md:hidden bg-gray-200 p-4'>
          <div className='flex flex-col items-start'>
            <Link to='/' className='text-blue-600 hover:underline font-medium mb-3'>Home</Link>
            <div className='relative w-full'>
              <button className='w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-between' onClick={toggleMobileSignupDropdown}>
                Signup
                <FaAngleDown />
              </button>

              {/* Mobile Signup Dropdown */}
              {showMobileSignupDropdown && (
                <div className="mt-2 bg-gray-200 rounded-lg shadow w-full z-50">
                  <ul className="text-sm text-gray-700">
                    <li>
                      <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">User</Link>
                    </li>
                   
                  </ul>
                </div>
              )}
            </div>
            <div className='relative w-full mt-3'>
              <button className='w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-between' onClick={toggleMobileLoginDropdown}>
                Login
                <FaAngleDown />
              </button>

              {/* Mobile Login Dropdown */}
              {showMobileLoginDropdown && (
                <div className="mt-2 bg-gray-200 rounded-lg shadow w-full z-50">
                  <ul className="text-sm text-gray-700">
                    <li>
                      <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">User</Link>
                    </li>
                   
                  </ul>
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className='relative flex items-center py-2 mt-3 w-full'>
              <input 
                type='search'
                placeholder='Search'
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full h-10 p-2 border border-gray-400 bg-white rounded pr-8'
              />
              <button 
                type='button'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 hover:text-gray-900 transition'
                onClick={handleSearchClick}
              >
                <IoSearch />
              </button>
            </div>

            {/* Add to Cart Icon - Mobile */}
            <div className='relative flex items-center mt-4'onClick={handleCartClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800 hover:text-gray-900 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
