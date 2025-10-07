import React, { useState } from "react";

/**
 * DropdownMenu
 * Props:
 * - topProducts: array (items can be strings, React nodes, or objects with .name node/string)
 * - categories: array (items can be strings or React nodes)
 * - trending: array (same shape as topProducts)
 *
 * Renders a segmented control (Top / Categories / Trending).
 * Clicking a tab shows only that list. No page reloads.
 */
const DropdownMenu = ({ topProducts = [], categories = [], trending = [] }) => {
  const [active, setActive] = useState("top"); // 'top' | 'categories' | 'trending'
  const [open, setOpen] = useState(false); // for smaller screens / dropdown toggle

  const renderItem = (item, idx) => {
    // item could be:
    // - a React node/string (e.g. categories passed as array of nodes)
    // - an object like { ...p, name: <Link>...</Link> } or { name: 'Name' }
    if (item == null) return null;
    if (typeof item === "string" || React.isValidElement(item)) {
      return (
        <li key={idx} className="py-2 px-3 hover:bg-gray-100 rounded">
          {item}
        </li>
      );
    }
    if (typeof item === "object") {
      const content = item.name ?? item.label ?? JSON.stringify(item);
      return (
        <li key={idx} className="py-2 px-3 hover:bg-gray-100 rounded">
          {React.isValidElement(content) ? content : String(content)}
        </li>
      );
    }
    // fallback
    return (
      <li key={idx} className="py-2 px-3 hover:bg-gray-100 rounded">
        {String(item)}
      </li>
    );
  };

  const activeList = () => {
    if (active === "top") return topProducts;
    if (active === "categories") return categories;
    if (active === "trending") return trending;
    return [];
  };

  return (
    <div className="relative w-full">
      {/* Segmented control */}
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
          <button
            onClick={() => { setActive("top"); setOpen(false); }}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:outline-none ${
              active === "top"
                ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Top Products
          </button>
          <button
            onClick={() => { setActive("categories"); setOpen(false); }}
            className={`px-4 py-2 text-sm font-medium focus:outline-none ${
              active === "categories"
                ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => { setActive("trending"); setOpen(false); }}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:outline-none ${
              active === "trending"
                ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Trending
          </button>
        </div>

        {/* Optional small-screen dropdown toggle */}
        <button
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          className="ml-3 inline-flex items-center px-3 py-2 border rounded-md text-sm bg-white ring-1 ring-gray-200 hover:bg-gray-50"
        >
          View
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${open ? "transform rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Panel */}
      <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200">
        {/* On small screens, toggle visibility */}
        <div className={`${open ? "block" : "block"}`}>
          <ul className="divide-y divide-gray-100 max-h-64 overflow-auto p-2">
            {activeList().length === 0 ? (
              <li className="p-3 text-sm text-gray-500">No items to show.</li>
            ) : (
              activeList().map((it, i) => renderItem(it, i))
            )}
          </ul>
        </div>
      </div>

      {/* small helper text */}
      <p className="text-xs text-gray-500 mt-2">
        Showing: <span className="font-medium">{active === "top" ? "Top Products" : active === "categories" ? "Categories" : "Trending"}</span>
      </p>
    </div>
  );
};

export default DropdownMenu;


