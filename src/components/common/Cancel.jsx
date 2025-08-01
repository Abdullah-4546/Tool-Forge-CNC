import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <FiXCircle className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Payment Cancelled!</h1>
        <p className="text-lg text-gray-700">Your payment was cancelled. Please try again.</p>
        <Link to="/" className="text-blue-500 mt-4 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
};

export default CancelPage;
