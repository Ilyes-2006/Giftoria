import React from 'react';
import './AdminProductCart.css';

export default function AdminProductCart({ product, onEdit, onRemove }) {
  return (
    <div className="admin-product-cart">
      <div className="admin-product-thumb">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="admin-product-details">
        <h4>{product.name}</h4>
        <hr />
        <p>{product.price} DZD</p>
      </div>

      {/* This is the container you wanted for both quantity and buttons */}
      <div className="admin-product-actions">
        <p className="admin-product-qty-text">Quantity: {product.quantity || 0}</p>
        
        <div className="admin-action-btns-row">
          <button className="admin-btn-edit" onClick={onEdit}>Edit</button>
          <button className="admin-btn-remove" onClick={onRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}