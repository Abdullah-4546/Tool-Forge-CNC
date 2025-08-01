import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../redux/actions/authAction';
import {
  clearError,
  clearLoginErr,
  clearLoginMessage,
  clearMessage
} from '../../../redux/reducers/authReducer';
import toast from 'react-hot-toast';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state

  const dispatch = useDispatch();
  const { loading, loginErr, loginMessage, isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberMeEmail = localStorage.getItem('rememberMeEmail');
    const rememberMePassword = localStorage.getItem('rememberMePassword');

    if (rememberMeEmail && rememberMePassword) {
      setFormData({
        ...formData,
        email: rememberMeEmail,
        password: rememberMePassword,
        rememberMe: true,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: formData.email,
      password: formData.password,
    };

    if (formData.rememberMe) {
      localStorage.setItem('rememberMeEmail', formData.email);
      localStorage.setItem('rememberMePassword', formData.password);
    } else {
      localStorage.removeItem('rememberMeEmail');
      localStorage.removeItem('rememberMePassword');
    }

    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (loginErr) {
      toast.error(loginErr.message);
      dispatch(clearLoginErr());
    }

    if (loginMessage) {
      toast.success(loginMessage);
      dispatch(clearLoginMessage());
    }

    if (isAuthenticated && user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'seller':
          navigate('/seller/dashboard');
          break;
        default:
          navigate('/');
      }
    }
  }, [loginErr, loginMessage, dispatch, toast, isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 overflow-hidden bg-gray-50">
        <svg
          className="absolute left-1/2 transform -translate-x-1/2 top-0 h-96 w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 960"
        >
          <defs>
            <pattern
              id="b1e6e422-0770-4ce8-86a3-77ae236f4b4a"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="1440" height="960" fill="url(#b1e6e422-0770-4ce8-86a3-77ae236f4b4a)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-md w-full sm:w-80 lg:w-96 xl:w-[40rem]">
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Login</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-4 py-2"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password + Eye Icon */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-4 py-2 pr-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 text-sm"
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {/* Remember me + Forget Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="flex item-right">
                  <Link to="/forget-password" className="ml-2 block text-sm text-black">
                    Forget Password
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? 'Loading...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
