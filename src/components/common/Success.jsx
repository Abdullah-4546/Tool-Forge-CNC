import React from 'react';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-8">Your payment was successful. Thank you for your purchase!</p>
        <Link to="/user/view-orders" className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
          View Order <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
