// src/pages/products.jsx
import React from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";
import { listings } from "../data";

// Helper to get unique categories
const getCategories = (tools) => {
  return Array.from(new Set(tools.map((t) => t.category || "Other")));
};

function makeSlug(name) {
  return encodeURIComponent(String(name || "category").toLowerCase().replace(/\s+/g, "-"));
}

// Top Products: highest rating
const topProducts = [...listings]
  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  .slice(0, 5);

// Trending: most likes (or views as fallback)
const trending = [...listings]
  .sort((a, b) => (b.likes || b.views || 0) - (a.likes || a.views || 0))
  .slice(0, 5);

// Categories
const categories = getCategories(listings);

// Convert items so DropdownMenu renders Links (no reload)
const linkedTop = topProducts.map((p) => ({
  ...p,
  // if p.id exists use it, otherwise use slug of name
  name: (
    <Link
      to={`/products/${p.id ?? makeSlug(p.name)}`}
      className="text-green-600 hover:underline"
    >
      {p.name}
    </Link>
  ),
}));

const linkedTrending = trending.map((p) => ({
  ...p,
  name: (
    <Link
      to={`/products/${p.id ?? makeSlug(p.name)}`}
      className="text-green-600 hover:underline"
    >
      {p.name}
    </Link>
  ),
}));

const linkedCategories = categories.map((c) => ({
  // DropdownMenu expects array of strings or values; keep category as string and also build a clickable node
  // we store both the raw value and a rendered name (DropdownMenu will read .name or the string)
  name: (
    <Link to={`/categories/${makeSlug(c)}`} className="text-green-600 hover:underline">
      {c}
    </Link>
  ),
  value: c,
}));

const ProductsPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
    <div className="w-full max-w-4xl px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
      <p className="text-center text-gray-600 mb-6">
        Quick links to top products, categories and trending tools.
      </p>
      <DropdownMenu
        topProducts={linkedTop}
        categories={linkedCategories.map((c) => c.name)} // DropdownMenu expects array of strings/nodes
        trending={linkedTrending}
      />
    </div>
  </div>
);

export default ProductsPage;
