import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <FiAlertTriangle className="text-6xl text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-700">Oops! The page you are looking for could not be found.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
