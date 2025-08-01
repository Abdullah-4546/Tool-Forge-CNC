import React, { useEffect } from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getTheAdminAnalytics } from "../../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

function AdminAnalytics() {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Hook for navigation
  const { totalProducts, totalUsers, totalCategories, totalBannedSellers } =
    useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTheAdminAnalytics());
  }, [dispatch]);

  // Handlers for navigation
  const handleNavigateToProducts = () => navigate("/admin/dashboard/products");
  const handleNavigateToUsers = () => navigate("/admin/dashboard/users");
  const handleNavigateToCategories = () => navigate("/admin/dashboard/view-category");
  const handleNavigateToBannedSellers = () => navigate("/admin/dashboard/banned-sellers");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          className="bg-white py-8 px-4 rounded-lg shadow-lg flex items-center justify-between cursor-pointer"
          onClick={handleNavigateToProducts} // Navigation on click
        >
          <div>
            <RiProductHuntLine className="text-4xl text-blue-500" />
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Total number of Products
            </h3>
            <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
          </div>
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between cursor-pointer"
          onClick={handleNavigateToUsers} // Navigation on click
        >
          <div>
            <CgProfile className="text-4xl text-gray-500" />
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Total number of Users
            </h3>
            <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
          </div>
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between cursor-pointer"
          onClick={handleNavigateToCategories} // Navigation on click
        >
          <div>
            <MdOutlineCategory className="text-4xl text-yellow-500" />
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Total number of Categories
            </h3>
            <p className="text-2xl font-bold text-gray-800">{totalCategories}</p>
          </div>
        </div>
        
        <div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between cursor-pointer"
          onClick={handleNavigateToBannedSellers} // Navigation on click
        >
          <div>
            <MdBlock className="text-4xl text-red-500" />
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Total number of Banned Sellers
            </h3>
            <p className="text-2xl font-bold text-gray-800">{totalBannedSellers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
