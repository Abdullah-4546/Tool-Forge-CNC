import { useDispatch, useSelector } from "react-redux";
import menuIcon from "../../../assets/menu-icon.svg";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/authAction";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { clearError, clearMessage } from "../../../redux/reducers/authReducer";
import { FiUser, FiLogOut, FiEdit2, FiLock, FiArrowLeft } from "react-icons/fi";

function SellerDashboardHeader(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  const { error, message, user } = useSelector((state) => state.auth);

  const handleLogoutFunc = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      navigate("/");
    }
  }, [navigate, dispatch, error, message]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dash-header bg-white shadow px-4 py-3">
      <div className="flex justify-between items-center w-full">
        {/* Left: Back + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-100 hover:text-white  flex items-center gap-1"
            title="Back"
          >
            <FiArrowLeft size={20} />
          </button>
          <div
            className="cursor-pointer"
            onClick={() => props.setControlNavbar(!props.controlNavbar)}
          >
            <img src={menuIcon} alt="menu" className="w-6 h-6" />
          </div>
        </div>

        {/* Right: User Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 text-black flex items-center justify-center font-bold uppercase">
              {user?.username?.charAt(0) || "U"}
            </div>
            <span className="font-medium text-black">
              {user?.username || "User"}
            </span>
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border z-50">
              <button
                onClick={() => {
                  navigate("/seller/dashboard/edit-profile");
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <FiEdit2 /> Edit Profile
              </button>
              <button
                onClick={() => {
                  navigate("/seller/dashboard/change-password");
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <FiLock /> Change Password
              </button>
              <button
                onClick={handleLogoutFunc}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboardHeader;
