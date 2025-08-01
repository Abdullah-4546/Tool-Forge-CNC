import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import Cart from "./SideCart";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../../redux/reducers/productReducer";
import { logoutUser } from "../../redux/actions/authAction";
import toast from "react-hot-toast";
import { clearError, clearMessage } from "../../redux/reducers/authReducer";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { isAuthenticated, user, error, message, } = useSelector((state) => state.auth);
  const cartItems = useSelector(state => state.product.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCartItems());
}, [dispatch]);

const handleLogoutFun = () => {
  dispatch(logoutUser())
  setAccountDropdownOpen(false)
}

useEffect(() => {
  if (error) {
    toast.error(error.message);
    dispatch(clearError());
  }
  if (message) {
    toast.success(message);
    dispatch(clearMessage());
  }
}, [error, message, dispatch, toast]);
  return (
    <div>
      <header className="border bg-gray-50">
        <nav
          className="flex items-center justify-between h-20 p-6 mx-auto max-w-7xl lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link
              to="/"
              className="text-2xl font-extrabold text-gray-800"
            >
              Tool Forge CNC
            </Link>
            {/* <img
              src={
                "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              }
              alt=""
              className="w-[60px] h-[60px] object-cover"
            /> */}
          </div>
          <div className="flex lg:hidden">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="px-2 py-1 text-lg font-semibold leading-6 text-gray-900 transition duration-300 rounded hover:bg-gray-200"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="px-2 py-1 text-lg font-semibold leading-6 text-gray-900 transition duration-300 rounded hover:bg-gray-200"
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className="px-2 py-1 text-lg font-semibold leading-6 text-gray-900 transition duration-300 rounded hover:bg-gray-200"
            >
              Cart
            </Link>
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!isAccountDropdownOpen)}
                className="px-2 py-1 text-lg font-semibold leading-6 text-gray-900 transition duration-300 rounded hover:bg-gray-200"
              >
                <FaUser className="inline-block mr-2" />
                {isAuthenticated && user ? `${user?.username}` : "Account"}
              </button>
              <button
                onClick={() => setCartOpen(!isCartOpen)}
                className="px-2 py-1 text-lg font-semibold leading-6 text-gray-900 transition duration-300 relative"
              >
                <FaShoppingCart className="inline-block ml-5 w-5 h-5" />
                {cartItems.length  > 0 && (
                  <span className="absolute top-0  left-15 text-center bg-blue-500 text-white rounded-full w-5 h-5">
                    {cartItems.length}
                  </span>
                )}
              </button>
              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
                  {/* Dropdown items */}
                  {isAuthenticated && user && (
                    <>
                      {user.role === "seller" && (
                        <Link
                          onClick={() => setAccountDropdownOpen(false)}
                          to="/seller/dashboard"
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                        >
                          Seller Dashboard
                        </Link>
                      )}
                      {user.role === "user" && (
                        <>
                        <Link
                          onClick={() => setAccountDropdownOpen(false)}
                          to="/user/edit-profile"
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                        >
                        Edit Profile
                        </Link>
                        <Link
                        onClick={() => setAccountDropdownOpen(false)}
                        to="/user/view-orders"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                      >
                      View Orders
                      </Link>
                      <div
                        onClick={handleLogoutFun}

                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
                      >
                        Logout
                      </div>
                      </>
                      )}
                      {user.role === "admin" && (
                        <Link
                          onClick={() => setAccountDropdownOpen(false)}
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                    </>
                  )}
                  {/* Register and Seller Register links */}

                  {!isAuthenticated && !user && (
                    <>
                    <Link
                        onClick={() => setAccountDropdownOpen(false)}
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                      >
                        Login
                      </Link>
                      <Link
                        onClick={() => setAccountDropdownOpen(false)}
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                      >
                        Register
                      </Link>
                      <Link
                        onClick={() => setAccountDropdownOpen(false)}
                        to="/seller-register"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                      >
                        Become a Seller
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        <div
          className={`lg:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="w-auto h-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  <Link
                    to="/"
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    Shop
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    Cart{" "}
                    {cartItems.length  > 0 && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setAccountDropdownOpen(!isAccountDropdownOpen)
                      }
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                    >
                      <FaUser className="inline-block mr-2" />
                        {isAuthenticated && user ? `${user?.username}` : "Account"}
                    </button>
                    {isAccountDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                        {/* Dropdown items */}
                        {isAuthenticated && user && (
                          <>
                            {user.role === "seller" && (
                              <Link
                                onClick={() => setAccountDropdownOpen(false)}
                                to="/seller/dashboard"
                                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                              >
                                Seller Dashboard
                              </Link>
                            )}
                            {user.role === "user" && (
                              <Link
                                onClick={() => setAccountDropdownOpen(false)}
                                to="/user/dashboard"
                                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                              >
                                User Dashboard
                              </Link>
                            )}
                            {user.role === "admin" && (
                              <Link
                                onClick={() => setAccountDropdownOpen(false)}
                                to="/admin/dashboard"
                                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                              >
                                Admin Dashboard
                              </Link>
                            )}
                          </>
                        )}
                        {/* Register and Seller Register links */}
                        {!isAuthenticated && !user && (
                          <>
                            <Link
                              onClick={() => setAccountDropdownOpen(false)}
                              to="/register"
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                            >
                              Register
                            </Link>
                            <Link
                              onClick={() => setAccountDropdownOpen(false)}
                              to="/seller-register"
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                            >
                              Become a Seller
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isCartOpen && <Cart setCartOpen={setCartOpen} />}
    </div>
  );
}

export default Navbar;
