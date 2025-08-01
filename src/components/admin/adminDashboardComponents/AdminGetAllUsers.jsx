import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetAllUsers } from "../../../redux/actions/authAction";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";
import {
  AdminBannedThrSellerAccounts,
  AdminDeleteTheUserAccount,
  AdminUnbanSellerAccount
} from "../../../redux/actions/profileAction";
import {
  clearDeleteAccountErr,
  clearDeleteAccountMsg
} from "../../../redux/reducers/profileReducer";

function AdminGetAllUser() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.auth);
  const {
    loading: profileLoading,
    deleteAccountErr,
    deleteAccountMsg
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(AdminGetAllUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(AdminDeleteTheUserAccount(userId));
  };

  const handleBanSeller = (sellerId) => {
    dispatch(AdminBannedThrSellerAccounts(sellerId));
  };

  const handleUnbanSeller = (sellerId) => {
    dispatch(AdminUnbanSellerAccount(sellerId));
  };

  useEffect(() => {
    if (deleteAccountErr) {
      toast.error(deleteAccountErr.message);
      dispatch(clearDeleteAccountErr());
    }
    if (deleteAccountMsg) {
      toast.success(deleteAccountMsg);
      dispatch(clearDeleteAccountMsg());
      dispatch(AdminGetAllUsers());
    }
  }, [deleteAccountErr, deleteAccountMsg, toast, dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          {data && data.length > 0 ? (
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    User Name
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    IsSeller
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    isVerified
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    isBanned
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {data.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="text-left py-3 px-4">{user?.username}</td>
                    <td className="text-left py-3 px-4">{user?.email}</td>
                    <td className="text-left py-3 px-4">
                      {user?.isSeller ? "true" : "false"}
                    </td>
                    <td className="text-left py-3 px-4">{user?.role}</td>
                    <td className="text-left py-3 px-4">
                      {user?.sellerInfo?.isVerified ? "true" : "false"}
                    </td>
                    <td className="text-left py-3 px-4">
                      {user?.sellerInfo?.isBanned ? "true" : "false"}
                    </td>
                    <td className="text-left py-3 px-4">
                      {user?.isSeller && user?.sellerInfo && (
                        <>
                          {user?.sellerInfo?.isBanned ? (
                            <button
                              onClick={() =>
                                handleUnbanSeller(user?.sellerInfo?._id)
                              }
                              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
                            >
                              {profileLoading ? "Loading..." : "Unban Seller"}
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleBanSeller(user?.sellerInfo?._id)
                              }
                              className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
                            >
                              {profileLoading ? "Loading..." : "Ban Seller"}
                            </button>
                          )}
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No data found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminGetAllUser;
