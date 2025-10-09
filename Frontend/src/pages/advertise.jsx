// src/pages/advertise.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

export default function AdvertisePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-25">
      {/* Logo at top */}
      <img src="./advertise.svg" alt="Logo" className="h-16 mb-4" />

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-green-600 text-center mb-2">
        Advertise Your AI Tool
      </h1>
      <p className="text-center text-gray-500 max-w-xl mb-8">
        Reach thousands of AI enthusiasts, developers, and businesses looking for the latest AI tools and solutions.
      </p>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex-1 min-w-[350px] flex flex-col items-center">
          <img src="/users.png" alt="" className="h-8 mb-2" />
          <div className="text-2xl font-bold mb-1">50K+</div>
          <div className="text-gray-500 text-sm">Monthly Visitors</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex-1 min-w-[350px] flex flex-col items-center">
          <img src="/users.png" alt="" className="h-8 mb-2" />
          <div className="text-2xl font-bold mb-1">85%</div>
          <div className="text-gray-500 text-sm">Tech Decision Makers</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex-1 min-w-[350px] min-h-[180px] flex flex-col items-center">
          <img src="/users.png" alt="" className="h-8 mb-2" />
          <div className="text-2xl font-bold mb-1">3.5x</div>
          <div className="text-gray-500 text-sm">Avg. ROI</div>
        </div>
      </div>

      {/* Choose Plan */}
      <h2 className="text-3xl font-bold text-left mb-6 w-full max-w-5xl flex justify-center">Choose Your Plan</h2>
      <div className="flex flex-col items-start mb-10 w-full max-w-5xl">
        <div className="bg-white border border-green-200 rounded-xl shadow-lg p-8 w-full max-w-xs flex flex-col items-center">
          <div className="mb-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">Most Popular</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Premium Plan <span className="text-xs font-normal text-gray-400">Basic</span>
          </h3>
          <div className="text-3xl font-bold text-green-600 mb-1">$1.00</div>
          <div className="text-xs text-gray-400 mb-4">/30 days billed</div>
          <ul className="text-sm text-gray-700 mb-6 space-y-2 text-left w-full">
            <li>✔️ Cgpt</li>
            <li>✔️ Advanced Analytics</li>
            <li>✔️ Social Media Promotion</li>
            <li>✔️ Newsletter Feature</li>
            <li>✔️ Priority Support</li>
            <li>✔️ Custom Integrations</li>
          </ul>
          <button className="w-full bg-green-500 text-white py-2 rounded-md font-semibold shadow hover:bg-green-600 mb-2">
            Pay with Stripe →
          </button>
          <button className="w-full bg-blue-50 text-blue-700 py-2 rounded-md font-semibold shadow hover:bg-blue-100">
            Pay with PayPal →
          </button>
        </div>
      </div>

      {/* Custom Solution */}
      <div className="bg-white rounded-xl shadow p-15 w-[50%] flex flex-col items-center mb-10">
        <div className="font-semibold text-3xl text-gray-800 mb-2">Need a Custom Solution?</div>
        <div className="text-xl text-gray-900 mb-4 text-center">Contact us to discuss an advertising package tailored to your specific needs.</div>
        <button
          onClick={() => navigate("/contact")}
          className="bg-green-500 text-white px-10 py-5 rounded-xl text-xl font-semibold shadow hover:bg-green-600"
        >
          Contact Sales
        </button>
      </div>

      <Footer />
    </div>
  );
}
