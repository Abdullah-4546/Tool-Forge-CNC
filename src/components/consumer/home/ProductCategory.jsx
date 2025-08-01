import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/actions/categoryAction';
import { Link } from 'react-router-dom';

function ProductCategories() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold mb-6 mx-10">Shop by Category</h2>
        {loading ? (
          // Skeleton loading
          <div className="mx-10 overflow-x-auto" style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex space-x-12">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="relative overflow-hidden rounded-2xl shadow-lg flex-none w-48 animate-pulse">
                  <div className="w-full h-40 bg-gray-300 rounded-t-lg" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition duration-300 opacity-0">
                    <button className="text-white text-lg font-semibold py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                      Explore
                    </button>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0">
                    <div className="text-white text-lg font-semibold bg-black bg-opacity-75 rounded-md py-2 px-4">
                      Explore
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Actual content
          <div className="mx-10 overflow-x-auto" style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex space-x-12">
              {data && data.map((category) => (
                <Link to={`/category/${category._id}/products`}>
                <div key={category?._id} className="relative overflow-hidden rounded-2xl shadow-lg flex-none border w-48">
                  <img src={category?.image?.url} alt={category?.name} className="w-full h-40 object-cover rounded-t-lg" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition duration-300 opacity-0 hover:opacity-100">
                    <button className="text-white text-lg font-semibold py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                      Explore {category?.name}
                    </button>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="text-white text-lg font-semibold bg-black bg-opacity-75 rounded-md py-2 px-4">
                      Explore {category?.name}
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductCategories;
