import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sellerVerficationEmail } from "../../../redux/actions/authAction";
import toast from "react-hot-toast";
import { clearError, clearMessage } from "../../../redux/reducers/authReducer";

function SellerVerificationEmail() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);
  const handleVerifyEmail = () => {
    
    dispatch(sellerVerficationEmail(token));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      navigate("/login");
    }
  }, [error, message, toast, navigate, dispatch]);
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Email Verification
          </h2>
          <p className="text-lg text-gray-600">
            Please verify your email to complete registration.
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <button
            disabled={loading}
            onClick={handleVerifyEmail}
            className="bg-gradient-to-r from-purple-400 to-indigo-600 hover:from-indigo-600 hover:to-purple-400 text-white px-8 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? "verifying..." : "Verify Email"}
          </button>
        </div>
        <div className="text-center">
          <p className="text-gray-700 mb-2">
            An email has been sent to your registered email address.
          </p>
          <p className="text-gray-700">
            Click on the verification link in the email to activate your
            account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SellerVerificationEmail;
