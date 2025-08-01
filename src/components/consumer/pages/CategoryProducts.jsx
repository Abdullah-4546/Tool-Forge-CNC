import React, { useEffect } from "react";
import ProductCard from "../home/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByCategoryBased } from "../../../redux/actions/productAction";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom";
function CategoryProducts() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { categoryProductData: data, loading, categoryName } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductsByCategoryBased(categoryId));
  }, [dispatch, categoryId]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className='mx-10'>
        <h2 className="text-3xl font-semibold mb-6">Our {categoryName} products</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
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
            ))}
          </div>
        ) : (
          <>
            {data && data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] bg-white border border-gray-200 rounded-lg shadow-md p-6">
                <FaSearch className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-2xl text-center text-gray-700 mb-4">No products found in this category.</p>
                <Link to={'/'}>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 shadow-lg">
                  Browse Other Categories
                </button>
                </Link>
                
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;
