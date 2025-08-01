import React, { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings'; // Assuming you want to show ratings if applicable
import toast from "react-hot-toast";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function ContainerCard({ container }) {
  console.log("containerdata in containerCard:",container)
  const dispatch = useDispatch();
  const [showQuickView, setShowQuickView] = useState(false);
  const truncatedTitle = truncateText(container?.title, 13); 
  const truncatedDescription = truncateText(container?.description, 100); 

 // Function to format date
 function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
  return (
    <div
      className="max-w-md mx-auto rounded-md overflow-hidden shadow-lg bg-white relative"
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
    >
      <div className="relative group">
        <img
          className="w-full h-64 object-cover transition duration-300 transform group-hover:scale-105"
          src={container?.images[0]?.url}
          alt={container?.title}
        />
        {showQuickView && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Link to={`/container/${container?._id}`}>
              <button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300">
                Quick View
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-xl text-gray-800">{truncatedTitle}</div>
          {container.seller && (
            <div className="text-sm text-gray-700 bg-gray-200 rounded-full px-2 font-semibold py-1">
              Seller: {container?.seller?.username}
            </div>
          )}
        </div>
        <p className="text-gray-700 text-base mb-4">{truncatedDescription}</p>
        <div className="flex items-center justify-left">
        <h4 className="font-bold text-sm text-gray-800">Bid Starting Price : </h4>
          <div className="text-gray-700 text-base ml-1 font-semibold text-lg">
            ${container?.startingPrice} {/* Adjust to show current bid */}
          </div>
        </div>
        <div >
          <h4 className="font-bold text-sm text-gray-800">Biding End Time :</h4>
          <p>{formatDate(container.endTime)}</p>
        </div>

      </div>
      <div className="px-6 py-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {container?.category?.name}
        </span>
      </div>
    </div>
  );
}

export default ContainerCard;
