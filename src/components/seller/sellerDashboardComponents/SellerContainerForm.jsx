import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBiddingContainer } from "../../../redux/actions/containerAction"; // Adjust path as necessary
import { clearError, clearMessage } from "../../../redux/reducers/profileReducer"; // Adjust path as necessary
import toast from "react-hot-toast";
import { fetchCategories } from "../../../redux/actions/categoryAction";
import { useNavigate } from 'react-router-dom';



function SellerContainerForm() {
  const { user } = useSelector((state) => state.auth);
  console.log("user:", user)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingPrice: "",
    category: "",
    images: [],
    endTime: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.category);
  const { loading, error, message } = useSelector((state) => state.container);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    formdata.append("startingPrice", formData.startingPrice);
    formdata.append("category", formData.category);
    formData.images.forEach((image) => {
      formdata.append("files", image);
    });
    formdata.append("endTime", formData.endTime);
    console.log("formData before dispatch:", formData)
    dispatch(createBiddingContainer(formdata))
    navigate('/seller/dashboard/view-containers');

  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  useEffect(() => {
    dispatch(fetchCategories());

  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, dispatch, toast, navigate]);

  return (
    <div className="body-bg flex-grow p-7 overflow-y-auto">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded px-8 py-6 mt-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Add Bidding</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="containerName">
                Container Name
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="title"
                placeholder="Enter the Container Name"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                placeholder="Enter the Container Description"
                value={formData.description}
                onChange={handleInputChange}
                rows="2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="startingPrice">
                Starting Price
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="startingPrice"
                placeholder="Enter the Starting Price"
                value={formData.startingPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                Category
              </label>
              <select
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {data && data.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="images">Images</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              name="images"
              onChange={handleFileInputChange}
              accept="image/*"
              multiple
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellerContainerForm;
