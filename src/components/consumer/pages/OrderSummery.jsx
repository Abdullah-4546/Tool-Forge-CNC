import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../redux/actions/orderAction';
import { clearError, clearMessage } from '../../../redux/reducers/orderReducer';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function OrderSummary() {
  
  const { shippingInfo, paymentMethod } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.product.cartItems);
  const { stripeCheckoutSession, error, loading, message } = useSelector((state) => state.orders);
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const navigate = useNavigate();

  const placeOrderFunc = () => {
    console.log("cartItems:",cartItems)

    if (paymentMethod === 'COD') {
      const orderData = {

        products: cartItems.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price * item.quantity,
          quantity:item.quantity,
          seller: item.seller._id
        })),
        totalPrice: totalPrice,
        shippingInfo: shippingInfo,
        paymentMethod: paymentMethod
      };
  
      dispatch(createOrder(orderData));
    } else if (paymentMethod === 'Stripe') {
      const orderData = {
        products: cartItems.map(item => ({
          _id: item._id,
          name: item.name,
          quantity:item.quantity,
          price: item.price,
          images: item.images.map(image => ({ url: image.url })),
          seller: item.seller._id
        })),
        totalPrice: totalPrice,
        shippingInfo: shippingInfo,
        paymentMethod: paymentMethod
      };
  
      dispatch(createOrder(orderData));
    }
  }
  

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      navigate('/user/view-orders');
    }
  }, [error, dispatch, message, navigate]);

  useEffect(() => {
    // Redirect to stripeCheckoutSession if available
    if (stripeCheckoutSession) {
      window.location.href = stripeCheckoutSession;
    }
  }, [stripeCheckoutSession]);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center">Order Summary</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
            <p className="text-gray-700">Full Name: {shippingInfo.fullName}</p>
            <p className="text-gray-700">Address: {shippingInfo.address}</p>
            <p className="text-gray-700">City: {shippingInfo.city}</p>
            <p className="text-gray-700">Country: {shippingInfo.country}</p>
            <p className="text-gray-700">Postal Code: {shippingInfo.postalCode}</p>
          </div>
          <div className="border border-gray-200 rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p className="text-gray-700">Selected Payment Method: {paymentMethod}</p>
          </div>
        </div>
        <div className="mt-6 border border-gray-200 rounded-md p-4">
          <h2 className="text-xl font-semibold mb-2">Product Details</h2>
          {cartItems.map(item => (
            <div key={item._id} className="flex items-center border-b py-4">
              <img src={item.images[0].url} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
              <div>
                <p className="text-gray-800">{item.name}</p>
                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border border-gray-200 rounded-md p-4">
          <h2 className="text-xl font-semibold mb-2">Total Price</h2>
          <p className="text-gray-700">Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <div className="mt-8">
          <button onClick={placeOrderFunc} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            {loading ? 'Loading...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
