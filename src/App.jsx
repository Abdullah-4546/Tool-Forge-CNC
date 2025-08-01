import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/consumer/pages/Home";
import RegistrationPage from "./components/common/auth/Registeration";
import SellerRegistration from "./components/common/auth/SellerRegisteration";
import LoginPage from "./components/common/auth/Login";
import ForgetPassword from "./components/common/auth/ForgetPassword";
import Shop from "./components/consumer/pages/Shop";
import Containers from "./components/consumer/pages/Containers";
import ContainerDetail from "./components/consumer/pages/ContainerDetail";
import ProductDetail from "./components/consumer/pages/ProductDetail";
import CartDetails from "./components/consumer/pages/CartDetails";
import AboutUs from "./components/common/AboutUs";
import ContactUs from "./components/common/ContactUs";


import Checkout from "./components/consumer/pages/Checkout";
import OrderSummary from "./components/consumer/pages/OrderSummery";
import SellerStore from "./components/consumer/pages/SellerStore";
import SellerCreateProduct from "./components/seller/sellerDashboardPages/SellerCreateProduct";
import SellerDashboard from "./components/seller/sellerDashboardPages/SellerDashboard";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { useEffect, useState } from "react";
import SellerViewProducts from "./components/seller/sellerDashboardPages/SellerViewProducts";
import SellerOrders from "./components/seller/sellerDashboardPages/SellerOrders";
import SellerCreateContainer from "./components/seller/sellerDashboardPages/SellerCreateContainer";
import SellerViewContainer from "./components/seller/sellerDashboardPages/SellerViewContainer";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./redux/actions/authAction";
import SellerVerificationEmail from "./components/seller/sellerDashboardComponents/SellerVerficationEmail";
import SellerEditProduct from "./components/seller/sellerDashboardPages/SellerEditProduct";
import SellerEditContainer from "./components/seller/sellerDashboardPages/SellerEditContainer";
import AdminDashboard from "./components/admin/adminDashboardPages/AdminDashboard";
import AdminCreateCategory from "./components/admin/adminDashboardPages/AdminCreateCategory";
import AdminViewCategory from "./components/admin/adminDashboardPages/AdminViewCategory";
import AdminEditCategory from "./components/admin/adminDashboardPages/AdminEditCategory";
import AdminProducts from "./components/admin/adminDashboardPages/AdminProducts";
import AdminAllUsers from "./components/admin/adminDashboardPages/AdminAllUsers";
import SuccessPage from "./components/common/Success";
import Cancel from "./components/common/Cancel";
import NotFound from "./components/common/NotFound";
import EditProfile from "./components/consumer/pages/EditProfile";
import ViewOrders from "./components/consumer/pages/ViewOrders";
import CategoryProducts from "./components/consumer/pages/CategoryProducts";
import SellerProtected from "./protected/SellerProtected";
import AdminProtected from "./protected/AdminProtected";
import AdminAllOrders from "./components/admin/adminDashboardPages/AdminAllOrders";
import AdminBannedSellers from "./components/admin/adminDashboardPages/AdminBannedSellers";
import UserProtected from "./protected/UserProtected";
import SellerEditProfilePage from "./components/seller/sellerDashboardPages/SellerEditProfilePage";
import SellerChangePasswordPage from "./components/seller/sellerDashboardPages/SellerChangePasswordPage";

export default function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Update showNavbar and showFooter based on the current location
    const path = location.pathname;
    setShowNavbar(
      !path.startsWith("/seller/dashboard") &&
        !path.startsWith("/admin/dashboard") &&
        !path.startsWith("/success") &&
        !path.startsWith("/cancel")
    );
    setShowFooter(
      !path.startsWith("/seller/dashboard") &&
        !path.startsWith("/admin/dashboard") &&
        !path.startsWith("/success") &&
        !path.startsWith("/cancel")
    );
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, dispatch]);

  const getAccessTokenFromLocalStorage = localStorage.getItem("accessToken");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const sellerSignIn =
    getAccessTokenFromLocalStorage && storedUser?.role === "seller";
  const adminSignIn =
    getAccessTokenFromLocalStorage && storedUser?.role === "admin";
  const userSignIn = getAccessTokenFromLocalStorage && storedUser?.role === "user";
  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/seller-register" element={<SellerRegistration />} />
        <Route
          path="/verify-email/:token"
          element={<SellerVerificationEmail />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/biding" element={<Containers />} />
        <Route path="/container/:id" element={<ContainerDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/seller-store/:id" element={<SellerStore />} />
        <Route
          path="/category/:categoryId/products"
          element={<CategoryProducts />}
        />

        {/* seller Routes */}

        <Route
          path="/seller/dashboard"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              <SellerDashboard />
            </SellerProtected>
          }
        />
        <Route
          path="/seller/dashboard/create-product"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              <SellerCreateProduct />
            </SellerProtected>
          }
        />

      <Route
          path="/seller/dashboard/edit-profile"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              <SellerEditProfilePage />
            </SellerProtected>
          }
        />

<Route
          path="/seller/dashboard/change-password"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              <SellerChangePasswordPage />
            </SellerProtected>
          }
        />
        <Route
          path="/seller/dashboard/view-products"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              <SellerViewProducts />
            </SellerProtected>
          }
        />
        <Route
          path="/seller/dashboard/orders"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              <SellerOrders />
            </SellerProtected>
          }
        />
         <Route
          path="/seller/dashboard/create-container"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              <SellerCreateContainer />
            </SellerProtected>
          }
        />
          <Route
          path="/seller/dashboard/view-containers"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              < SellerViewContainer/>
            </SellerProtected>
          }
        />
        <Route
          path="/seller/dashboard/edit-product/:id"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              <SellerEditProduct />
            </SellerProtected>
          }
        />
 <Route
          path="/seller/dashboard/edit-container/:id"
          element={
            <SellerProtected isSignedIn={sellerSignIn}>
              <SellerEditContainer />
            </SellerProtected>
          }
        />
        {/* admin routes */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtected isSignedIn={adminSignIn}>
              <AdminDashboard />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/dashboard/create-category"
          element={
            <AdminProtected isSignedIn={adminSignIn}>
              <AdminCreateCategory />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/dashboard/view-category"
          element={
            <AdminProtected isSignedIn={adminSignIn}>
              <AdminViewCategory />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/dashboard/edit-category/:id"
          element={
            <AdminProtected isSignedIn={adminSignIn}>
              <AdminEditCategory />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/dashboard/products"
          element={
            <AdminProtected isSignedIn={adminSignIn}>
              <AdminProducts />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/dashboard/users"
          element={
            <AdminProtected isSignedIn={adminSignIn}>
              <AdminAllUsers />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/dashboard/orders"
          element={
            <AdminProtected isSignedIn={adminSignIn}>
              <AdminAllOrders/>
            </AdminProtected>
          }
        />

        <Route
          path="/admin/dashboard/banned-sellers"
          element={
            <AdminProtected isSignedIn={adminSignIn}>
              <AdminBannedSellers/>
            </AdminProtected>
          }
        />

        {/* success and cannel routes */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* user routes */}

        <Route path="/user/edit-profile" element={
        <UserProtected  isSignedIn={userSignIn}>
            <EditProfile />
        </UserProtected>
      } />
        <Route path="/user/view-orders" element={
        <UserProtected  isSignedIn={userSignIn}>
          <ViewOrders />
        </UserProtected>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />

      {showFooter && <Footer />}
    </>
  );
}
