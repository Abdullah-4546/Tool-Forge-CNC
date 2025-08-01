import React from 'react';
import SellerProductCard from './SellerProductCard';
import { useSelector } from 'react-redux';
import Loader from '../../common/Loader';

function SellerProducts() {
  const { loading, user } = useSelector((state) => state.auth);
console.log("SellerProducts:",user?.sellerInfo?.products)
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className='mx-10'>
        <h2 className="text-3xl font-semibold mb-6">View Products</h2>
        {user?.sellerInfo?.products?.length ? (
          <div className="grid grid-cols sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user?.sellerInfo?.products?.map((product) => (
              <SellerProductCard key={product?._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-2xl text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProducts;
