import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderDetails, updateOrderStatus } from '../../../redux/actions/orderAction';
import Loader from '../../common/Loader';
import toast from 'react-hot-toast';
import { fetchProfile } from '../../../redux/actions/authAction';

function SellerOrdersTable() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { loading: orderLoading, error, message } = useSelector((state) => state.orders);


  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (message) {
      toast.success(message);
      setShowModal(false);
      dispatch(fetchProfile());
    }
  }, [error, message, dispatch]);

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status); // Populate dropdown with current status
    setShowModal(true);
  };

  const handleSubmit = () => {
    // Check if selectedOrder exists and newStatus is not empty
    if (selectedOrder && newStatus) {
      // Extract product information from the selected order
      const products = selectedOrder.products.map(product => ({
        _id: product.product._id,
        quantity: product.quantity
      }));
      console.log(products)
      // Dispatch the updateOrderStatus action with order ID, status, and product information
      dispatch(updateOrderStatus({
        orderId: selectedOrder._id,
        status: newStatus,
        products: products // Pass the product information to the backend
      }));
    }
  };
  

  return (
    <>
      <div className="container mx-auto text-black">
        <h1 className="text-3xl font-bold mt-8 mb-4 text-center">Your Orders</h1>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {user?.sellerInfo?.orders?.map((order) => (
              <div key={order._id} className="px-4 md:px-8 lg:px-16 py-2 text-white">
                <div className="bg-[#111827] border rounded-2xl p-4 md:p-8 lg:p-10 mb-4 flex flex-col md:flex-row justify-between">
                  <div className="w-full md:w-1/2 pr-0 md:pr-8">
                    <div className="mb-4">
                      <h3 className="text-xl md:text-2xl font-bold mb-4">Products</h3>
                      {order?.products?.map((product) => (
                        <div key={product?.product?._id} className="border rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center">
                          {product?.product?.images?.length > 0 && (
                            <img src={product?.product?.images[0]?.url} alt={product?.product?.name} className="w-full md:w-24 h-24 object-cover rounded-lg mb-4 md:mr-4 md:mb-0" />
                          )}
                          <div>
                            <p className="font-bold">{product?.product?.name}</p>
                            <p className="text-gray-300">Price: ${product?.product?.price}</p>
                            <p className="text-gray-300">Quantity: {product?.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 pl-0 md:pl-8">
                    <div className="mb-4">
                      <div className="flex flex-col md:flex-row justify-between items-center py-4 md:py-8">
                        <h2 className="text-lg md:text-xl font-bold">Order ID: {order?._id}</h2>
                        <p className="text-gray-300">Order Date: {new Date(order?.orderDate).toLocaleDateString()}</p>
                      </div>
                      <p className="text-gray-300">Total Price: ${order?.totalPrice}</p>
                      <p className="text-gray-300">Status: {order?.status}</p>
                      <p className="text-gray-300">PaymentMethod: {order?.paymentMethod}</p>
                      <button
                        onClick={() => handleEdit(order)}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Shipping Information</h3>
                      <p className="text-gray-300">
                        Name: {order?.shippingInfo?.fullName} <br />
                        Address: {order?.shippingInfo?.address} <br />
                        City: {order?.shippingInfo?.city} <br />
                        Country: {order?.shippingInfo?.country} <br />
                        Postal Code: {order?.shippingInfo?.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Order Status</h3>
                    <div className="mt-2">
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option disabled value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {orderLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SellerOrdersTable;
