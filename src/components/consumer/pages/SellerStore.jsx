import React, { useEffect } from "react";
import { VscUnverified } from "react-icons/vsc";
import ProductCard from "../home/ProductCard";
import { MdVerified } from "react-icons/md";
import Loader from "../../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getTheSellerDetailsById } from "../../../redux/actions/profileAction";
import { useParams } from "react-router-dom";

function SellerStore() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { seller, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getTheSellerDetailsById(id));
  }, [id, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {seller && !seller.isBanned ? (
            <div className="bg-gray-100 min-h-screen">
              <div className="container mx-auto px-4 py-8">
                <div className="mb-8 bg-white shadow-md rounded-lg p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {seller.companyName}
                    </h1>
                    <div className="flex items-center space-x-2">
                      {seller.isVerified ? (
                        <>
                          <span className="text-sm text-gray-600">
                            Verified Seller
                          </span>
                          <MdVerified className="text-blue-500 w-6 h-6" />
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-600">
                            Not Verified Seller
                          </span>
                          <VscUnverified className="text-red-500 w-6 h-6" />
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    {seller.companyDescription}
                  </p>
                  <div className="text-gray-600 mb-6">
                    <p className="mb-2">
                      <span className="font-semibold">Username:</span>{" "}
                      {seller.user.username}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Email:</span>{" "}
                      {seller.user.email}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Address:</span>{" "}
                      {seller.address}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Phone Number:</span>{" "}
                      {seller.phoneNumber}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seller.products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center text-3xl font-bold text-gray-800">
              This seller account is banned.
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SellerStore;
