import React from 'react';

function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded px-10 py-10 mt-10 mb-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to <span className="font-bold">Tool Forge CNC</span>, your one-stop solution for all your tech support needs. 
        Our mission is to provide top-tier, reliable, and professional tech support services to individuals and businesses alike. 
        With a dedicated team of experienced technicians, we aim to resolve your technical issues efficiently, 
        so you can focus on what matters most.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
      <p className="text-lg text-gray-700 mb-6">
        At Tool Forge CNC, our mission is to empower users by solving their tech problems in the most effective way possible. 
        We prioritize customer satisfaction and are committed to delivering exceptional service every step of the way.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
      <ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
        <li>Professional and Experienced Support Team</li>
        <li>24/7 Customer Assistance</li>
        <li>Affordable Tech Solutions</li>
        <li>Customized Support Packages Tailored to Your Needs</li>
        <li>Cutting-edge technology and best practices</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Services</h2>
      <p className="text-lg text-gray-700 mb-6">
        We offer a wide range of tech support services, including hardware troubleshooting, software installation, 
        network setup, cybersecurity support, and more. No matter the issue, our team is ready to assist you and 
        provide the best solutions.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
      <p className="text-lg text-gray-700 mb-6">
        Got a question or need support? Feel free to <a href="/contact" className="text-blue-500 hover:underline">contact us</a>. 
        We're here to help you with all your tech needs, ensuring a smooth and hassle-free experience.
      </p>

      <div className="mt-6">
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go to Home Page
        </a>
      </div>
    </div>
  );
}

export default AboutUs;
