import React from 'react';
import './DropdownMenu.jsx'; // Optional: for styling

const DropdownMenu = ({ topProducts, categories, trending }) => {
  return (
    <div className="dropdown-menu-custom">
      <div className="dropdown-section">
        <h4>Top Products</h4>
        <ul>
          {topProducts.map((tool) => (
            <li key={tool.id || tool.name}>{tool.name}</li>
          ))}
        </ul>
      </div>
      <div className="dropdown-section">
        <h4>Categories</h4>
        <ul>
          {categories.map((cat, idx) => (
            <li key={cat || idx}>{cat}</li>
          ))}
        </ul>
      </div>
      <div className="dropdown-section">
        <h4>Trending</h4>
        <ul>
          {trending.map((tool) => (
            <li key={tool.id || tool.name}>{tool.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
