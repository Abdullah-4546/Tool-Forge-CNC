import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/actions/productAction';

function DisplayProducts() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className='mx-10'>
        <h2 className="text-3xl font-semibold mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            // Skeleton loading
            [...Array(4)].map((_, index) => (
              <div key={index} className="max-w-md mx-auto rounded-md overflow-hidden shadow-lg bg-gray-200 animate-pulse">
                <div className=" w-64 h-40 bg-gray-300" />
                <div className="px-6 py-4">
                  <div className="mb-4 bg-gray-300 h-8" />
                  <p className="text-gray-700 text-base mb-4 bg-gray-300 h-20" />
                  <div className="flex justify-between items-center">
                    <div className="text-gray-900 font-semibold text-lg bg-gray-300 w-20 h-8" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Actual content
            data && data?.slice?.(0,8)?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayProducts;
