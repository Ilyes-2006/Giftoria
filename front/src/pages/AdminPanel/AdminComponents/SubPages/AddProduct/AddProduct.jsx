import React from 'react';
import './AddProduct.css';
import StatCart from '../../StatCart/StatCart'; 
import NewProduct from '../../NewProduct/NewProduct'; // Your form/creation component

export default function AddProduct ({ products, onAddProduct }){
  const productCount = Array.isArray(products) ? products.length : 0;

  return (
    <div className="addproduct-page-container">
      {/* Top Section: Statistics */}
      <div className="subpage-stats-wrapper">
        <StatCart label="Products" value={productCount} />
      </div>

      <hr className="admin-section-divider" />

      {/* Header Section */}
      <h2 className="admin-section-title">Add New Product</h2>

      {/* Content Section: Instead of mapping, we call the NewProduct component */}
      <div className="addproduct-form-wrapper">
        <NewProduct onAddProduct={onAddProduct} />
      </div>
    </div>
  );
};

