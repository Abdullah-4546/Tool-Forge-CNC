// components/SellerContainers.js
import React, { useEffect } from 'react';
import SellerContainerCard from './SellerContainerCard';
import { useSelector } from 'react-redux';
import Loader from '../../common/Loader';

function SellerContainers() {
  // const { loading ,error } = useSelector((state) => state.container);
  const { loading, user, error } = useSelector((state) => state.auth);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div className="text-red-500">{typeof error === 'string' ? error : error?.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className='mx-10'>
        <h2 className="text-3xl font-semibold mb-6">View Bidding</h2>
        {user?.sellerInfo?.containers?.length ? (
          <div className="grid grid-cols sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user?.sellerInfo?.containers?.map((container) => (
              <SellerContainerCard key={container._id} container={container} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-2xl text-gray-500">
            No containers found
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerContainers;
