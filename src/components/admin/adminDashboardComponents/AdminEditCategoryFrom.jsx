import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminCategorydeleteById,
  adminCategoryGetById,
  editAdminCategories,
} from "../../../redux/actions/categoryAction";
import toast from "react-hot-toast";
import {
  clearError,
  clearMessage,
} from "../../../redux/reducers/categoryReducer";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditCategoryForm() {
  const [formData, setFormData] = useState({
    categoryName: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, message, singleData, isDeleteloading } = useSelector(
    (state) => state.category
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(adminCategoryGetById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleData) {
      setFormData({
        categoryName: singleData.name,
        image: singleData.image.url,
      });
      setImagePreview(singleData.image.url); // Set initial image preview
    }
  }, [singleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file)); // Update image preview
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", formData.categoryName);
    formdata.append("file", formData.image);
    dispatch(editAdminCategories({ id, formData: formdata }));
  };

  const handleDelete = () => {
    dispatch(adminCategorydeleteById(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      navigate("/admin/dashboard/view-category");
    }
  }, [error, message, dispatch, navigate]);

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded px-10 py-10 mt-10">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="categoryName"
          >
            Category Name
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="categoryName"
            placeholder="Enter the Category Name"
            value={formData.categoryName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileInputChange}
          
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-sm"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isDeleteloading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminEditCategoryForm;
