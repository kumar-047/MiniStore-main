import React from 'react';
import pic1 from '/images/shirts.jpeg';
import pic2 from '/images/loungewear.jpeg';
import pic3 from '/images/jackets.jpeg';
import pic4 from '/images/Collections.jpg';  // Add new image imports
import pic5 from '/images/jeans.jpg';  // Add new image imports

const Categories = () => {
  return (
    <div>
      {/* First Grid: 3 Images */}
      <div className="px-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <div className="w-full h-full rounded overflow-hidden shadow-lg relative">
          <img src={pic1} alt="Shirts" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <span className="text-white text-4xl font-bold">SHIRT STYLE!</span>
          </div>
        </div>
        <div className="w-full h-full rounded overflow-hidden shadow-lg relative">
          <img src={pic2} alt="Loungewear" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <span className="text-white text-4xl font-bold">LOUNGEWEAR LOVE</span>
          </div>
        </div>
        <div className="w-full h-full rounded overflow-hidden shadow-lg relative">
          <img src={pic3} alt="Jackets" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <span className="text-white text-4xl font-bold">LIGHT JACKETS</span>
          </div>
        </div>
      </div>

      {/* Second Grid: 2 Images */}
      <div className="px-8 mt-4 grid sm:grid-cols-2 gap-4">
        <div className="w-full h-full rounded overflow-hidden shadow-lg relative">
          <img src={pic4} alt="Image 4" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <span className="text-white text-4xl font-bold">NEW DRESSES</span>
          </div>
        </div>
        <div className="w-full h-full rounded overflow-hidden shadow-lg relative">
          <img src={pic5} alt="Image 5" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <span className="text-white text-4xl font-bold">THE PERFECT JEANS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
