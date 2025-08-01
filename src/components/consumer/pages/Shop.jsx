import React, { useEffect, useState } from "react";
// import { products } from '../../../utils/productData';
import ProductCard from "../home/ProductCard";
import { FiSearch } from "react-icons/fi";
import InputRange from "react-input-range";
import Rating from "react-rating";
import "react-input-range/lib/css/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/productAction";
import Loader from '../../common/Loader';
function Shop() {
  const dispatch = useDispatch();
  const { data: products, loading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [minRating, setMinRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleMinRatingChange = (value) => {
    setMinRating(value);
  };

  const handleBrandFilterChange = (brand) => {
    setSelectedBrands((prevBrands) => {
      if (prevBrands.includes(brand)) {
        return prevBrands.filter((item) => item !== brand);
      } else {
        return [...prevBrands, brand];
      }
    });
  };

  const applyFilters = () => {
    let filtered = products.filter((product) => {
      const passesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const passesPrice =
        (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || product.price <= parseFloat(priceRange.max));
      const passesRating =
        minRating === 0 ||
        (product.reviews.length > 0 &&
          product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length >=
            minRating);
      const passesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      return passesSearch && passesPrice && passesRating && passesBrand;
    });

    setFilteredProducts(filtered);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/4">
                {/* Filters */}
                <div className="mb-6 bg-white p-6">
                  <h2 className="text-xl font-semibold mb-4">Filters</h2>
                  {/* Search Filter */}
                  <div className="mb-4 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search"
                      className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                  {/* Price Range Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <InputRange
                      minValue={0}
                      maxValue={1000}
                      value={priceRange}
                      onChange={handlePriceRangeChange}
                    />
                  </div>
                  {/* Rating Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Rating
                    </label>
                    <Rating
                      emptySymbol={
                        <i className="far fa-star text-gray-400"></i>
                      }
                      fullSymbol={
                        <i className="fas fa-star text-yellow-400"></i>
                      }
                      initialRating={minRating}
                      onChange={handleMinRatingChange}
                    />
                  </div>
                  {/* Brand Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    {Array.from(
                      new Set(products.map((product) => product.brand))
                    ).map((brand) => (
                      <div key={brand} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          value={brand}
                          className="mr-1"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandFilterChange(brand)}
                        />
                        <span className="text-sm">{brand}</span>
                      </div>
                    ))}
                  </div>
                  {/* Apply Filter Button */}
                  <button
                    className="px-4 py-2 mt-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-3/4 mt-6 lg:mt-0">
                {/* Products Display */}
                <h2 className="text-3xl font-semibold mb-6">Our Products</h2>
                {filteredProducts.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p>No products found.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Shop;
