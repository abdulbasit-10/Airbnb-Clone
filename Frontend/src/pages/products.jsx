import React from 'react';
import DropdownMenu from '../components/DropdownMenu';
import { listings } from '../data';

// Helper to get unique categories
const getCategories = (tools) => {
	return Array.from(new Set(tools.map(t => t.category || 'Other')));
};

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

const ProductsPage = () => (
	<div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
		<DropdownMenu topProducts={topProducts} categories={categories} trending={trending} />
	</div>
);

export default ProductsPage;
