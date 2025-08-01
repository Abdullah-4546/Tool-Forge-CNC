import React, { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

function truncateText(text, maxLength) {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function SellerProductCard({ product }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const truncatedName = truncateText(product?.name, 13); // Adjust the maxLength as needed
  const truncatedDescription = truncateText(product?.description, 100); // Adjust the maxLength as needed

  return (
    <div
      className="max-w-md mx-auto rounded-md overflow-hidden shadow-lg bg-white relative"
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
    >
      <div className="relative group">
        {product?.images?.[0]?.url ? (
          <img
            className="w-full h-64 object-cover transition duration-300 transform group-hover:scale-105"
            src={product.images[0].url}
            alt={product?.name}
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-700">
            No Image Available
          </div>
        )}
        {showQuickView && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Link to={`/product/${product?._id}`} className="mb-2">
                <button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300">
                  Quick View
                </button>
              </Link>
              {/* Edit Button */}
              <Link to={`/seller/dashboard/edit-product/${product?._id}`}>
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
          <div className="font-bold text-xl text-gray-800">{truncatedName}</div>
          {product?.seller && (
            <div className="text-sm text-gray-700 bg-gray-200 rounded-full px-2 font-semibold py-1">
              Seller: {product.seller.username}
            </div>
          )}
        </div>
        <p className="text-gray-700 text-base mb-4">{truncatedDescription}</p>
        <div className="flex items-center justify-between">
          <div className="text-gray-900 font-semibold text-lg">${product?.price}</div>
          {product?.reviews?.length > 0 ? (
            <div className="flex items-center">
              <StarRatings
                rating={product?.reviews?.reduce((acc, curr) => acc + curr?.rating, 0) / product?.reviews?.length}
                starRatedColor="#fbbf24"
                starEmptyColor="#d1d5db"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
              <span className="text-gray-600 ml-2">{product?.reviews?.length} reviews</span>
            </div>
          ) : (
            <span>No reviews yet</span>
          )}
        </div>
      </div>
      <div className="px-6 py-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {product?.category?.name}
        </span>
        {product?.brand && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            Brand: {product.brand}
          </span>
        )}
        {/* Add to Cart Icon */}
        <div className="sm:hidden text-gray-600 mt-2">
          <FaCartPlus className="text-gray-600 hover:text-gray-800 transition duration-300" />
        </div>
      </div>
    </div>
  );
}

export default SellerProductCard;


