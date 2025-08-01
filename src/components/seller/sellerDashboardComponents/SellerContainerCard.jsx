// components/SellerContainerCard.js
import React, { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function truncateText(text, maxLength) {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function SellerContainerCard({ container }) {
  console.log("container.seller:",container)
  const [showQuickView, setShowQuickView] = useState(false);
  const truncatedName = truncateText(container?.name, 13); // Adjust the maxLength as needed
  return (
<div
className="max-w-md mx-auto rounded-md overflow-hidden shadow-lg bg-white relative"
onMouseEnter={() => setShowQuickView(true)}
onMouseLeave={() => setShowQuickView(false)}
>
<div className="relative group">
  {container?.images?.[0]?.url ? (
    <img
      className="w-full h-64 object-cover transition duration-300 transform group-hover:scale-105"
      src={container.images[0].url}
      alt={container?.name}
    />
  ) : (
    <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-700">
      No Image Available
    </div>
  )}
  {showQuickView && (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Link to={`/container/${container?._id}`} className="mb-2">
          <button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300">
            Quick View
          </button>
        </Link>
        {/* Edit Button */}
        <Link to={`/seller/dashboard/edit-container/${container?._id}`}>
          <button className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-700 transition duration-300">
            Edit
          </button>
        </Link>
      </div>
    </div>
  )}
</div>
<div className="px-6 py-4">
  <div className="flex justify-between items-center mb-4">
    {container?.seller  && (
      <div className="text-sm text-gray-700 bg-gray-200 rounded-full px-2 font-semibold py-1">
        Seller: {container.seller.username}
      </div>
    )}
  </div>
  <h6 className="text-md font-bold text-xl text-gray-800 px-2 font-semibold py-1">{truncatedName}</h6>
  <p className="text-gray-700 text-base mb-4"> {container?.description}</p>
  <div className="flex items-center justify-between">
    <div className="text-gray-900 font-semibold text-lg"> Starting Price :${container?.startingPrice}</div>
  </div>
</div>
<div className="px-6 py-2">
<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {container?.category?.name}
        </span>
  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    Biding End's At :{container?.endTime}
  </span>

  {/* Add to Cart Icon */}
  <div className="sm:hidden text-gray-600 mt-2">
    <FaCartPlus className="text-gray-600 hover:text-gray-800 transition duration-300" />
  </div>
</div>
</div>

    
  );
}

export default SellerContainerCard;
