import React, { useEffect } from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa'; // Importing FaTrashAlt
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCartItems, removeFromCart } from '../../redux/reducers/productReducer';

function Cart({ setCartOpen }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.product.cartItems);
    const {user, isAuthenticated} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    useEffect(() => {
        dispatch(getAllCartItems());
    }, [dispatch]);

    const handleNavigate = () => {
        if(user && isAuthenticated) {
            navigate('/checkout');
            setCartOpen(false);
        }else{
            navigate('/login')
        }
        
    };

    const removeItemFromCart = (productId) => {
      dispatch(removeFromCart({ productId: productId }));
  };
  

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-80 flex justify-end">
            <div className="max-w-sm w-full bg-white shadow-lg h-full">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">Your Cart</h3>
                        <button className="text-gray-600" onClick={() => setCartOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-600">Your cart is empty.</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map((item, index) => (
                                    <li key={index} className="py-2 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={item.images[0]?.url} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-2" />
                                            <div>
                                                <p className="text-gray-800">{item.name}</p>
                                                <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                            <button onClick={() => removeItemFromCart(item._id)}>
                                                <FaTrashAlt className="ml-2 text-red-500 cursor-pointer" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="flex items-center justify-center  border-t border-gray-200">
                            <button onClick={handleNavigate} className="bg-gray-800 text-white w-full py-4  hover:bg-gray-700 focus:outline-none">
                                Proceed to Checkout (${totalPrice.toFixed(2)})
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;
