import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPaymentMethod, setShippingInfo } from '../../../redux/reducers/checkoutReducer';

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for shipping information
  const [shippingInfo, setShippingInfoLocal] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });
  // State for selected payment method
  const [paymentMethod, setPaymentMethodLocal] = useState('COD');

  // Load saved shipping information from localStorage on component mount
  useEffect(() => {
    const savedShippingInfo = localStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
      setShippingInfoLocal(JSON.parse(savedShippingInfo));
    }
  }, []);

  // Function to handle input change in shipping information
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfoLocal(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle payment method change
  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setPaymentMethodLocal(value);
  };

  // Function to handle submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save shipping information to localStorage
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    // Dispatch actions to update shipping information and payment method in Redux store
    dispatch(setShippingInfo(shippingInfo));
    dispatch(setPaymentMethod(paymentMethod));
    // Redirect to order summary page
    navigate('/order-summary');
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Shipping Information */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleShippingInfoChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-12" required />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleShippingInfoChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-12" required />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingInfoChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-12" required />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input type="text" id="country" name="country" value={shippingInfo.country} onChange={handleShippingInfoChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-12" required />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input type="text" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingInfoChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-12" required />
            </div>
            {/* Add more shipping input fields here as needed */}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <div>
            <label className="flex items-center mb-2 cursor-pointer">
              <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={handlePaymentMethodChange} className="mr-2 cursor-pointer" />
              <span className="text-gray-800">Cash on Delivery (COD)</span>
            </label>
            <label className="flex items-center mb-2 cursor-pointer">
              <input type="radio" name="paymentMethod" value="Stripe" checked={paymentMethod === 'Stripe'} onChange={handlePaymentMethodChange} className="mr-2 cursor-pointer" />
              <span className="text-gray-800">Stripe</span>
            </label>
          </div>
        </div>

        {/* View Order Summary Button */}
        <div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            View Order Summary
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
