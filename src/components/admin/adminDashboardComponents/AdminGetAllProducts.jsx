import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminDeleteProductById, AdminGetAllProduct } from "../../../redux/actions/productAction";
import Loader from "../../common/Loader";
import { clearError, clearMessage } from "../../../redux/reducers/productReducer";
import toast from "react-hot-toast";

function AdminGetAllProducts() {
  const dispatch = useDispatch();
  const { data, loading , error, message} = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(AdminGetAllProduct());
  }, [dispatch]);

  const deleteFunction = (id) => {
    dispatch(AdminDeleteProductById(id))
  }

  useEffect(() => {
    if(error) {
        toast.error(error.message);
        dispatch(clearError())
    }
    if(message) {
        toast.success(message);
        dispatch(clearMessage())
        dispatch(AdminGetAllProduct());
    }
  },[error, message, dispatch, toast])

  return (
    <div>
      {loading ? (
        <Loader/>
      ) : (
        <div className="overflow-x-auto">
          {data && data.length > 0 ? (
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Product Name
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Brand
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Quantity
                  </th>
                  
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Seller
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {data.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100">
                    <td className="text-left py-3 px-4">{product?.name}</td>
                    <td className="text-left py-3 px-4">{product?.price}</td>
                    <td className="text-left py-3 px-4">{product?.category?.name}</td>
                    <td className="text-left py-3 px-4">{product?.brand}</td>
                    <td className="text-left py-3 px-4">{product?.quantity}</td>
            
                    <td className="text-left py-3 px-4">{product?.seller?.username}</td>
                    <td className="text-left py-3 px-4">
                      <button onClick={() => deleteFunction(product?._id)} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full mr-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No data found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminGetAllProducts;
