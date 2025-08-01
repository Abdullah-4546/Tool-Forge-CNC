import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/Loader";
import { getBannedSellers } from "../../../redux/actions/authAction"; 

function AdminGetBannedSellers() {
  const dispatch = useDispatch();
  const { bannedSellers, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getBannedSellers()); 
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Banned Sellers</h2>

      {loading ? (
        <Loader/>
      ) : error ? (
        <p className="text-red-500">Error loading banned sellers: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Seller ID</th>
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Phone Number</th>
                <th className="py-2 px-4 border-b text-left">Company Name</th>
                <th className="py-2 px-4 border-b text-left">Banned Reason</th>
              </tr>
            </thead>
            <tbody>
              {bannedSellers?.length > 0 ? (
                bannedSellers.map((seller) => (
                  <tr key={seller._id}>
                    <td className="py-2 px-4 border-b">{seller._id}</td>
                    <td className="py-2 px-4 border-b">{seller.user?.username || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{seller.user?.email || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{seller.phoneNumber || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{seller.companyName || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{seller.banReason || "Not provided"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-4 text-center">
                    No banned sellers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminGetBannedSellers;
