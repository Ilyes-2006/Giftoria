import React from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose}>&times;</button>
        <div className="product-modal-layout">
          <div className="product-modal-image-wrapper">
            <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} />
          </div>
          <div className="product-modal-details">
            <h2>{product.name}</h2>
            <p className="product-modal-price">{product.price.toFixed(0)} DZD</p>
            <div className="product-modal-description">
              <h3>Description</h3>
              <p>{product.description || "No description available for this product."}</p>
            </div>
            <button className="btn-add-cart-modal" onClick={onAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
