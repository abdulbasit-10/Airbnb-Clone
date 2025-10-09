import React, { useState, useEffect } from "react";

const DropdownMenu = ({ topProducts = [], categories = [], trending = [] }) => {
  const [active, setActive] = useState("top"); // 'top' | 'categories' | 'trending'
  const [open, setOpen] = useState(false);

  // Debug: log incoming props and active list
  useEffect(() => {
    console.log("DropdownMenu props:", { topProducts, categories, trending });
  }, [topProducts, categories, trending]);

  useEffect(() => {
    console.log("Active tab:", active, "Open:", open);
  }, [active, open]);

  const renderItem = (item, idx) => {
    if (item == null) {
      return (
        <li key={idx} className="py-2 px-3 text-sm text-gray-400">
          (empty)
        </li>
      );
    }

    // If it's a React element (JSX) render directly
    if (React.isValidElement(item)) {
      return (
        <li key={idx} className="py-2 px-3 hover:bg-gray-100 rounded">
          {item}
        </li>
      );
    }

    // Primitives (string/number/boolean)
    if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
      return (
        <li key={idx} className="py-2 px-3 hover:bg-gray-100 rounded">
          {String(item)}
        </li>
      );
    }

    // Objects: prefer common fields (name, title, label), else JSON
    if (typeof item === "object") {
      const content = item.name ?? item.title ?? item.label ?? item.id ?? JSON.stringify(item);
      return (
        <li key={item.id ?? idx} className="py-2 px-3 hover:bg-gray-100 rounded">
          {String(content)}
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
            onClick={() => { setActive("top"); setOpen(true); }}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:outline-none ${
              active === "top"
                ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Top Products
          </button>
          <button
            onClick={() => { setActive("categories"); setOpen(true); }}
            className={`px-4 py-2 text-sm font-medium focus:outline-none ${
              active === "categories"
                ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => { setActive("trending"); setOpen(true); }}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:outline-none ${
              active === "trending"
                ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Trending
          </button>
        </div>

        {/* small-screen dropdown toggle */}
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
        {/* Fix: actually hide on closed */}
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <ul className="divide-y divide-gray-100 max-h-64 overflow-auto p-2">
            {Array.isArray(activeList()) && activeList().length === 0 ? (
              <li className="p-3 text-sm text-gray-500">No items to show.</li>
            ) : (
              (activeList() || []).map((it, i) => renderItem(it, i))
            )}
          </ul>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Showing:{" "}
        <span className="font-medium">
          {active === "top" ? "Top Products" : active === "categories" ? "Categories" : "Trending"}
        </span>
      </p>
    </div>
  );
};

export default DropdownMenu;
