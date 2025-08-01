import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdminCategories } from '../../../redux/actions/categoryAction';
import toast from 'react-hot-toast';
import { clearError, clearMessage } from '../../../redux/reducers/categoryReducer';
import { useNavigate } from 'react-router-dom';


function AdminCreateCategoryForm() {
  const [formData, setFormData] = useState({
    categoryName: '',
    image: null,
  });

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.category);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; // Get the first file only
    setFormData({
      ...formData,
      image: file,
    });
  };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('name', formData.categoryName);
    formdata.append('file', formData.image);

    dispatch(createAdminCategories(formdata));
  };

  useEffect(() => {
    if(error){
      toast.error(error.message);
      dispatch(clearError());
    }
    if(message){
      toast.success(message);
      dispatch(clearMessage());
      navigate('/admin/dashboard/view-category')
    }
  },[error, message, dispatch, toast])

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded px-10 py-10 mt-10">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="categoryName">
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
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default AdminCreateCategoryForm;
