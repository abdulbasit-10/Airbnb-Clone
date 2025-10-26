// src/pages/submitTool.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  website: "",
  logo: "",
  category: "",
  pricing: "",
  highlights: "",
  twitter: "",
  github: "",
};

const categories = ["Productivity", "Writing", "Design", "Video", "Audio", "Research", "Other"];
const pricingTypes = ["Free", "Paid", "Freemium", "Contact for Pricing"];

export default function SubmitTool({ onClose }) {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  // unify closing behavior: prefer onClose prop, otherwise navigate to home
  const close = () => {
    if (typeof onClose === "function") {
      try {
        onClose();
        return;
      } catch (e) {
        // fall through to navigate
      }
    }
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

     const sendData = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/tool", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });

          const data = await response.json();
          // localStorage.setItem(data.token);
          console.log("Server Response:", data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    sendData();
    
    setForm(initialState);
    // call unified close (onClose or navigate)
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2 mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative overflow-y-auto max-h-[90vh]"
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:shadow"
          aria-label="Close submit tool modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-1">Submit New Tool</h2>
        <p className="text-gray-500 mb-6">Submit a new AI tool to share with the community.</p>

        <div className="mb-4">
          <label className="block font-medium mb-1">Tool Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Enter tool name"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="text-xs text-gray-400 mt-1">Minimum 2 characters</div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            minLength={10}
            placeholder="Describe what the tool does, its key features, and benefits"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[70px]"
          />
          <div className="text-xs text-gray-400 mt-1">Minimum 10 characters</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Website URL *</label>
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              required
              type="url"
              placeholder="https://example.com"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Logo/Image URL *</label>
            <input
              name="logo"
              value={form.logo}
              onChange={handleChange}
              required
              type="url"
              placeholder="https://example.com/logo.png"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Pricing Type *</label>
            <select
              name="pricing"
              value={form.pricing}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select pricing type</option>
              {pricingTypes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Key Highlights *</label>
          <input
            name="highlights"
            value={form.highlights}
            onChange={handleChange}
            required
            placeholder="e.g., Free plan, API access, 24/7 support (comma separated)"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="text-xs text-gray-400 mt-1">Enter features separated by commas</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Twitter URL</label>
            <input
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
              type="url"
              placeholder="https://twitter.com/..."
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">GitHub URL</label>
            <input
              name="github"
              value={form.github}
              onChange={handleChange}
              type="url"
              placeholder="https://github.com/..."
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={close}
            className="px-6 py-2 rounded-md border border-green-400 text-green-600 font-semibold bg-white hover:bg-green-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 shadow"
          >
            Submit Tool
          </button>
        </div>
      </form>
    </div>
  );
}
