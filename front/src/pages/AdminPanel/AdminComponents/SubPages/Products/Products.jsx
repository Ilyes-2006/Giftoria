import React from 'react';
import './Products.css';
import StatCart from '../../StatCart/StatCart'; 
import AdminProductCart from '../../AdminProductCart/AdminProductCart'; // Assuming you have a ProductCard component

export default function Products ({ products }){
  // Check if products exists and is an array to avoid .length errors
  const isDataValid = Array.isArray(products);
  const productCount = isDataValid ? products.length : 0;
  

  return (
    <div className="products-page-container">
      {/* Top Section: Statistics */}
      <div className="subpage-stats-wrapper">
        <StatCart label="Products" value={productCount} />
      </div>

      <hr className="admin-section-divider" />

      <h2 className="admin-section-title">Products</h2>

      {/* Grid Section: Product Cards */}
      <div className="products-grid-layout">
        {isDataValid ? (
          products.map((product, index) => (
            <AdminProductCart product={product}
            
            />
          ))
        ) : (
          <p>No product data available.</p>
        )}
      </div>
    </div>
  );
};

