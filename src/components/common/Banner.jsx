import React from 'react';
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <div className="relative mx-10 my-10 bg-gradient-to-r rounded-xl shadow-xl">
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={'/banner1.jpg'} 
          alt="Banner"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative flex flex-col items-center justify-center h-full px-6 py-20 text-center lg:py-32 lg:px-0">
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">Welcome to Our Store</h1>
        <p className="mb-8 text-lg text-gray-300">Discover amazing products and deals.</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link to="/shop" className="px-8 py-4 text-lg font-semibold text-white transition duration-300 ease-in-out bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-700">Shop Now</Link>
          <Link to="/biding" className="px-8 py-4 text-lg font-semibold text-white transition duration-300 ease-in-out bg-red-600 rounded-md shadow-lg hover:bg-red-700">Browse Bidding Options</Link>
          <Link to="/aboutUs" className="px-8 py-4 text-lg font-semibold text-white transition duration-300 ease-in-out bg-transparent border border-white rounded-md shadow-lg hover:bg-white hover:text-indigo-600">About Us</Link>
        </div>
      
      </div>
    </div>
  );
}

export default Banner;
