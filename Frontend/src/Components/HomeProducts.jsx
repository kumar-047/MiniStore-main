import React from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { toast } from 'react-toastify';
import cloth1 from '/images/cloth1.jpeg';
import cloth2 from '/images/cloth2.jpg';
import cloth3 from '/images/cloth3.jpg';
import cloth4 from '/images/cloth4.jpg';
import cloth5 from '/images/cloth5.jpg';
import cloth6 from '/images/cloth6.jpg';
import cloth7 from '/images/cloth7.jpeg';
import cloth8 from '/images/cloth8.jpeg';

const HomeProducts = () => {
    const handleAddToCart = () => {
        toast.info('Please log in first');
      };
  return (
    <div className="px-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
      {/* Card 1 */}
      <div className="card bg-base-100 w-full h-96 shadow-xl relative group overflow-hidden">
        <figure className="h-full">
          <img
            className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
            src={cloth1}
            alt="cloth1"
            style={{ objectPosition: 'top' }}
          />
        </figure>
        {/* Dark Overlay and Add to Cart Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <button className="bg-white rounded-full p-2 shadow-md flex items-center justify-center"onClick={handleAddToCart}>
            <BsCartCheck className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Repeat for other cards... */}

      {/* Card 2 */}
      <div className="card bg-base-100 w-full h-96 shadow-xl relative group overflow-hidden">
        <figure className="h-full">
          <img
            className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
            src={cloth2}
            alt="cloth2"
          />
        </figure>
        {/* Dark Overlay and Add to Cart Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <button className="bg-white rounded-full p-2 shadow-md flex items-center justify-center"onClick={handleAddToCart}>
            <BsCartCheck className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Continue with other cards similarly */}
      {/* Card 3 */}
      <div className="card bg-base-100 w-full h-96 shadow-xl relative group overflow-hidden">
        <figure className="h-full">
          <img
            className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
            src={cloth3}
            alt="cloth3"
          />
        </figure>
        {/* Dark Overlay and Add to Cart Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <button className="bg-white rounded-full p-2 shadow-md flex items-center justify-center"onClick={handleAddToCart}>
            <BsCartCheck className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Card 4 */}
      <div className="card bg-base-100 w-full h-96 shadow-xl relative group overflow-hidden">
        <figure className="h-full">
          <img
            className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
            src={cloth4}
            alt="cloth4"
          />
        </figure>
        {/* Dark Overlay and Add to Cart Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <button className="bg-white rounded-full p-2 shadow-md flex items-center justify-center"onClick={handleAddToCart}>
            <BsCartCheck className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Card 5 */}
      <div className="card bg-base-100 w-full h-96 shadow-xl relative group overflow-hidden">
        <figure className="h-full">
          <img
            className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
            src={cloth5}
            alt="cloth5"
          />
        </figure>
        {/* Dark Overlay and Add to Cart Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <button className="bg-white rounded-full p-2 shadow-md flex items-center justify-center"onClick={handleAddToCart}>
            <BsCartCheck className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Card 6 */}
      <div className="card bg-base-100 w-full h-96 shadow-xl relative group overflow-hidden">
        <figure className="h-full">
          <img
            className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
            src={cloth6}
            alt="cloth6"
          />
        </figure>
        {/* Dark Overlay and Add to Cart Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <button className="bg-white rounded-full p-2 shadow-md flex items-center justify-center"onClick={handleAddToCart}>
            <BsCartCheck className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Card 7 */}
      <div className="card bg-base-100 w-full h-96 shadow-xl relative group overflow-hidden">
        <figure className="h-full">
          <img
            className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
            src={cloth7}
            alt="cloth7"
          />
        </figure>
        {/* Dark Overlay and Add to Cart Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <button className="bg-white rounded-full p-2 shadow-md flex items-center justify-center"onClick={handleAddToCart}>
            <BsCartCheck className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Card 8 */}
      <div className="card bg-base-100 w-full h-96 shadow-xl relative group overflow-hidden">
        <figure className="h-full">
          <img
            className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
            src={cloth8}
            alt="cloth8"
          />
        </figure>
        {/* Dark Overlay and Add to Cart Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <button className="bg-white rounded-full p-2 shadow-md flex items-center justify-center"onClick={handleAddToCart}>
            <BsCartCheck className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
