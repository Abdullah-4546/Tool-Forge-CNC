import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendResetCode, verifyResetCodeAndUpdatePassword } from '../../../redux/actions/authAction';
import { clearError, clearMessage } from '../../../redux/reducers/authReducer';
import toast from 'react-hot-toast';

function ForgetPassword() {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  // Handle form submissions
  const handleSendCode = (e) => {
    e.preventDefault();
    dispatch(sendResetCode({ email }));
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    dispatch(verifyResetCodeAndUpdatePassword({ email, resetCode, newPassword, confirmNewPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (message) {
      if (step === 1 && !showSuccessMessage) {
        setStep(2); 
        setShowSuccessMessage(true); 
      } else if (step === 2 ) {
        if (message !== 'Password reset successfully!') {
          navigate('/login'); 
        }
      }
      dispatch(clearMessage()); 
    }
  }, [error, message, step, dispatch, navigate, showSuccessMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {step === 1 ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">Send Reset Code</h2>
            <form className="space-y-6" onSubmit={handleSendCode}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
                disabled={loading} 

              >
                {loading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">Verify Code & Reset Password</h2>
            <form className="space-y-6" onSubmit={handleVerifyCode}>
              <div>
                <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">
                  4-Digit Reset Code
                </label>
                <input
                  type="text"
                  id="resetCode"
                  name="resetCode"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  required
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
              >
                {loading ? 'Verifying...' : 'Submit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
