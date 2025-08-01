import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetAllOrdersAction } from '../../../redux/actions/orderAction';
import Loader from '../../common/Loader';

function AdminGetAllOrders() {

    const dispatch = useDispatch();
    const {loading , adminOrdersData} = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(adminGetAllOrdersAction())
    },[dispatch])
  return (
    <div className="container mx-auto text-black">
    <h1 className="text-3xl font-bold mt-8 mb-4 text-center">All Orders</h1>
    {loading ? (
      <Loader />
    ) : (
      <div>
        {adminOrdersData && adminOrdersData?.map((order) => (
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
                  <p className="text-gray-300">User: {order?.user?.email}</p>
                  <p className="text-gray-300">Seller: {order?.seller?.email}</p>
                  <p className="text-gray-300">Total Price: ${order?.totalPrice}</p>
                  <p className="text-gray-300">Status: {order?.status}</p>
                  <p className="text-gray-300">PaymentMethod: {order?.paymentMethod}</p>
                  
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
  )
}

export default AdminGetAllOrders