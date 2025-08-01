// ContactUs.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendContactUsEmail } from '../../redux/actions/authAction'; // Adjust the import path as needed
import toast from 'react-hot-toast';

function ContactUs() {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth); // Adjust the slice name as necessary

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log("formData from contact us page:",formData)
      await dispatch(sendContactUsEmail(formData)).unwrap(); // Dispatch the action
    //   toast.success('Your message has been sent!'); // Notify user of success
      // Clear the form after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      toast.error(error); // Notify user of any error
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded px-10 py-10 mt-10 mb-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Have any questions or need help? Feel free to reach out to us! Our support team is here to assist you with any inquiries or concerns you may have.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Your Name</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Your Email</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="message">Your Message</label>
            <textarea
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>} {/* Display success message */}
      {error && <p className="text-red-600 mt-4">{error}</p>} {/* Display error message */}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
        <p className="text-lg text-gray-700 mb-2"><strong>Email:</strong> support@premiumtechsupport.com</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Phone:</strong> +1-800-555-1234</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Address:</strong> 1234 Tech Support St, Suite 100, Silicon Valley, CA</p>
      </div>
    </div>
  );
}

export default ContactUs;
