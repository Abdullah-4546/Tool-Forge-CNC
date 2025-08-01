import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editSellerContainer,
  containerGetById,
  sellerDeleteContainerById,
} from "../../../redux/actions/containerAction";
import {
  clearError,
  clearMessage,
} from "../../../redux/reducers/containerReducer";
import toast from "react-hot-toast";
import { fetchCategories } from "../../../redux/actions/categoryAction";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProfile } from "../../../redux/actions/authAction";

function SellerEditContainerForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingPrice: "",
    category: "",
    images: [],
    endTime: "",
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.category);
  const { loading, error, message,containers, loadingDelete } = useSelector(
    (state) => state.container
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });

    // Generate image previews
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(containerGetById(id)); // Fetch container details by ID
  }, [dispatch, id]);

  useEffect(() => {
        console.log("containers in sellereditcontainerform:",containers); // Check what's being fetched
    if (containers && !loading && !error && !message) {
      const {
        title,
        description,
        startingPrice,
        category,
        images,
        endTime,
      } = containers;
      const formattedEndTime = endTime ? new Date(endTime).toISOString().slice(0, 16) : "";

      setFormData({
        title: title || "",
        description: description || "",
        startingPrice: startingPrice || "",
        category: category ? category._id : "", // Safeguard here
        images: images && images.length > 0 ? [images[0].url] : [], 
        endTime: formattedEndTime || "",
      });

      setImagePreviews(images && images.length > 0 ? [images[0].url] : []);
    }
  }, [loading, error, message, containers]);

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

    console.log("Submitting updated  data -in handleSubmit:", formdata);


    dispatch(editSellerContainer({ id, formData: formdata }));
  };

  const handleDelete = () => {
    dispatch(sellerDeleteContainerById(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      dispatch(fetchProfile());
      navigate("/seller/dashboard/view-containers");
    }
  }, [error, message, dispatch, navigate]);

  return (
    <div className="body-bg flex-grow p-7 overflow-y-auto">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded px-8 py-6 mt-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Edit Container</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Name
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
                {data &&
                  data.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="images">
                Images
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                name="images"
                onChange={handleFileInputChange}
                accept="image/*"
                multiple
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    className="h-20 w-20 object-cover border rounded"
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="endTime">
                Bidding End Time
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
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              onClick={handleDelete}
            >
              {loadingDelete ? "Deleting..." : "Delete"}
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerEditContainerForm;
