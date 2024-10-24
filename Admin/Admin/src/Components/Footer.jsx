import React from 'react';
import {  FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdOutlineShoppingBag } from "react-icons/md";
import pic1 from '/images/visa.png';
import pic2 from '/images/rupay.png';
import pic3 from '/images/mastero.png';
import pic4 from '/images/master.png'
import pic5 from '/images/jcb.png'
import pic6 from '/images/discover.png'

const Footer = () => {
  return (
    <div className="bg-gray-100 py-10 md:py-5 mt-20">
      <div className="container max-w-full ">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col justify-center items-start text-black">
              <div className="flex items-center mb-4">
                <MdOutlineShoppingBag className="text-4xl mr-2" />
                <h1 className="text-2xl font-bold">MiniStore</h1>
              </div>
              <p className="mb-4">MiniStore Online Boutique and Designers Chavarcode
                Palayamkunnu P.O, Varkala
                Trivandrum - 695146</p>
              <p className="mb-4">Phone: 9188775160</p>
              <p>Email: info@ministore.in</p>
              <div className="flex mt-6">
                
                  <FaLinkedin className="text-3xl hover:text-blue-500 transition mr-4" />
                
            
                  <FaFacebook className="text-3xl hover:text-blue-500 transition mr-4" />
                
            
                  <FaInstagram className="text-3xl hover:text-blue-500 transition mr-4" />
    
              </div>
            </div>
            <div className="text-black mt-20">
              <h2 className="text-xl font-bold mb-4">Pages</h2>
              <ul className="text-lg">
                <li>Register</li>
                <li>Login</li>
                <li>Categories</li>
                <li>Products</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-black mb-4 mt-16">Payments</h2>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <img src={pic1} alt='mcapics' className="w-full rounded-md" />
                <img src={pic2} alt='mbaics' className="w-full rounded-md" />
                <img src={pic3} alt='mcompics' className="w-full rounded-md" />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <img src={pic4} alt='mcapics' className="w-full rounded-md" />
                <img src={pic5} alt='mbaics' className="w-full rounded-md" />
                <img src={pic6} alt='mcompics' className="w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
