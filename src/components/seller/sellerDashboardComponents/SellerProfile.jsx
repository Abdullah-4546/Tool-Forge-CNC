import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearEditProfileMsg, clearError, clearMessage } from '../../../redux/reducers/profileReducer';
import { updateSellerProfile } from '../../../redux/actions/profileAction';

const SellerProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, editProfileMsg } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    companyName: '',
    companyDescription: '',
    address: '',
    phoneNumber: '',
    website: '',
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setFormData({
      username: user?.username,
      email: user?.email,
      companyName: user?.sellerInfo?.companyName || '',
      companyDescription: user?.sellerInfo?.companyDescription || '',
      address: user?.sellerInfo?.address || '',
      phoneNumber: user?.sellerInfo?.phoneNumber || '',
      website: user?.sellerInfo?.website || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSellerProfile(formData));
    
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (editProfileMsg) {
      toast.success(editProfileMsg);
      dispatch(clearEditProfileMsg());
      setEditMode(false); // Exit edit mode after submitting
    }
  }, [error, editProfileMsg, dispatch]);

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded px-10 py-10 mt-10">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Seller Profile</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="username">Username</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
                readOnly={!editMode}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly={!editMode}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="companyName">Company Name</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="companyName"
                placeholder="Enter the Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
                readOnly={!editMode}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="companyDescription">Company Description</label>
              <textarea
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="companyDescription"
                placeholder="Enter the Company Description"
                value={formData.companyDescription}
                onChange={handleChange}
                rows="2"
                required
                readOnly={!editMode}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Address</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="address"
                placeholder="Enter the Company Address"
                value={formData.address}
                onChange={handleChange}
                required
                readOnly={!editMode}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneNumber">Phone Number</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="phoneNumber"
                placeholder="Enter the Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                readOnly={!editMode}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="website">Website</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="url"
                name="website"
                placeholder="Enter the Company Website Link"
                value={formData.website}
                onChange={handleChange}
                readOnly={!editMode}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${editMode ? 'hidden' : ''}`}
            >
              Edit
            </button>
            <button
              disabled={loading}
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!editMode ? 'hidden' : ''}`}
            >
              {loading ? 'Loading....' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SellerProfile;
