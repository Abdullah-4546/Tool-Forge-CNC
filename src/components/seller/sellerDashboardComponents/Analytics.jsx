import React from 'react';
import { RiProductHuntLine, RiShoppingCart2Line } from 'react-icons/ri';
import { MdOutlinePayment } from 'react-icons/md';
import { useSelector } from 'react-redux';

function Analytics() {
  const { user } = useSelector((state) => state.auth);

  // Calculate total amount of all orders
  const totalAmount =
    user?.sellerInfo?.orders?.reduce((total, order) => {
      return total + order.totalPrice;
    }, 0) || 0; // Provide default value if orders array is undefined

  return (
    <div>
      <div className="grid grid-cols  gap-4 px-[100px]">
        <div className="bg-white py-8 px-4 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <RiProductHuntLine className="text-4xl text-blue-500" />
            <h3 className="text-lg font-semibold mt-4 mb-2">Total number of products</h3>
            <p className="text-2xl font-bold text-gray-800">{user?.sellerInfo?.products?.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <RiShoppingCart2Line className="text-4xl text-green-500" />
            <h3 className="text-lg font-semibold mt-4 mb-2">Total number of orders</h3>
            <p className="text-2xl font-bold text-gray-800">{user?.sellerInfo?.orders?.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <MdOutlinePayment className="text-4xl text-yellow-500" />
            <h3 className="text-lg font-semibold mt-4 mb-2">Total Amount</h3>
            <p className="text-2xl font-bold text-gray-800">${totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
