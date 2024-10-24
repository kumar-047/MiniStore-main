import React, { useState } from 'react';
import Logo from '/images/logo.png';
import { IoSearch } from "react-icons/io5";
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const AdminNavbar = () => {
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
              <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center" onClick={toggleLoginDropdown}>
                Login
                <FaAngleDown className="ml-2" />
              </button>

              {/* Login Dropdown menu */}
              {showLoginDropdown && (
                <div className="absolute mt-2 bg-gray-200 rounded-lg shadow w-32 z-50">
                  <ul className="text-sm text-gray-700">
                    <li>
                      <Link to="/adminlogin" className="block px-4 py-2 hover:bg-gray-100">Admin</Link>
                    </li>
                  </ul>
                </div>
              )}
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
                      <Link to="/adminlogin" className="block px-4 py-2 hover:bg-gray-100">Admin</Link>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
