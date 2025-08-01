import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  getAllCartItems,
  increaseQuantity,
  removeFromCart,
} from "../../../redux/reducers/productReducer";
import toast from "react-hot-toast";

function CartDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.product.cartItems);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // Define total price state
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price on cart items change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  // Define function to handle increment
  const handleIncrement = (id) => {
    dispatch(increaseQuantity({ productId: id }));
  };

  // Define function to handle decrement
  const handleDecrement = (id) => {
    // Dispatch action to decrease quantity
    dispatch(decreaseQuantity({ productId: id }));
  };

  // Define function to handle remove item
  const handleRemoveItem = (id) => {
    // Dispatch action to remove item from cart
    dispatch(removeFromCart({ productId: id }));
  };

  // Define function to handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }
    if (!user && !isAuthenticated) {
      navigate("/login");
    } else {
      // Redirect to shipping info page
      navigate("/checkout");
    }
  };

  // Fetch cart items data on component mount
  useEffect(() => {
    dispatch(getAllCartItems());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-10 py-36">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div className="space-y-4">
          {/* Cart items UI */}
          {cartItems.length === 0 ? (
            <p className="text-2xl text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center border rounded-md p-4 hover:bg-gray-100"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-gray-800">{item.name}</p>
                  <p className="text-gray-600">
                    Price: ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaMinus />
                  </button>
                  <p className="px-2">{item.quantity}</p>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Section */}
        <div className="border rounded-md p-4 bg-gray-50">
          <div className="mb-4">
            <p className="text-lg font-semibold">Total Price:</p>
            <p className="text-2xl font-bold text-blue-600">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Proceed to Shipping Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
