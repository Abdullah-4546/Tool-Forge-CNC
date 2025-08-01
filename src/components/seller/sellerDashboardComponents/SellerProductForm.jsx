import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSellerProduct } from "../../../redux/actions/productAction";
import { clearError, clearMessage } from "../../../redux/reducers/productReducer";
import toast from "react-hot-toast";
import { fetchCategories } from "../../../redux/actions/categoryAction";
import {useNavigate} from 'react-router-dom'
import { fetchProfile } from "../../../redux/actions/authAction";

function SellerProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    images: [],
    quantity: "",
    color: "",
    size: "",
    weight: "",
      length: "",
      width: "",
      height: "",
  
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data} = useSelector((state) => state.category)
  const {loading, error, message} = useSelector((state) => state.product)
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
  };

  useEffect(()=> {
    dispatch(fetchCategories())
  },[dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("description", formData.description);
    formdata.append("price", formData.price);
    formdata.append("category", formData.category);
    formdata.append("brand", formData.brand);
    formData.images.forEach((image) => {
      formdata.append("files", image);
    });
    formdata.append("quantity", formData.quantity);
    formdata.append("color", formData.color);
    formdata.append("size", formData.size);
    formdata.append("weight", formData.weight);
    formdata.append("length", formData.length);
    formdata.append("width", formData.width);
    formdata.append("height", formData.height);
    dispatch(createSellerProduct(formdata));
  };

  useEffect(() => {
    if(error){
      toast.error(error.message);
      dispatch(clearError());
    }
    if(message){
      toast.success(message);
      dispatch(clearMessage());
      dispatch(fetchProfile())
      navigate('/seller/dashboard/view-products')
    }
  },[error, message, dispatch, toast])

  

  return (
    <div className="body-bg flex-grow p-7 overflow-y-auto">

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded px-8 py-6 mt-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                placeholder="Enter the Product Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
              <textarea
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                placeholder="Enter the Product Description"
                value={formData.description}
                onChange={handleInputChange}
                rows="2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="price">Price</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="price"
                placeholder="Enter the Product Price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="category">Category</label>
              <select
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {
                 data && data.map((d) => (
                    <>
                    <option value={d?._id}>{d.name}</option>
                    </>
                  ))
                }
                
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="brand">Brand</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="brand"
                placeholder="Enter the Product Brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
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
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="quantity">Quantity</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="quantity"
                placeholder="Enter the Product Quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="color">Color</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="color"
                placeholder="Enter the Product Color"
                value={formData.color}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="size">Size</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="size"
                placeholder="Enter the Product Size"
                value={formData.size}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="weight">Weight</label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="weight"
                placeholder="Enter the Product Weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Dimensions</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="length">Length</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="length"
                  placeholder="Enter the Product Length"
                  value={formData.length}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="width">Width</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="width"
                  placeholder="Enter the Product Width"
                  value={formData.width}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="height">Height</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="height"
                  placeholder="Enter the Product Height"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
            </div>
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

export default SellerProductForm;
