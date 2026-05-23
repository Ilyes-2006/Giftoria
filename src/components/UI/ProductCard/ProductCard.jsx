import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProductModal from '../ProductModal/ProductModal';

export default function ProductCard({ product, onAddToCart, user }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function requireAuth() {
    if (!user) {
      localStorage.setItem(
        "pendingAction",
        JSON.stringify({
          type: "addToCart",
          productId: product.id
        })
      );

      navigate("/Inscription");
      return false;
    }

    return true;
  }
  
  function handleAddToCart(e) {
    if (e) e.stopPropagation();
    if (!requireAuth()) return;

    onAddToCart?.(product);
  }

  return (
    <>
      <article className="product-card" onClick={() => setIsModalOpen(true)}>
        <div className="product-image-placeholder">
          <img 
            src={product.image || 'https://via.placeholder.com/200'} 
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-footer">
            <span className="product-price">DZD {product.price.toFixed(2)}</span>
            <button 
              className="btn-add-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </article>

      {isModalOpen && (
        <ProductModal 
          product={product} 
          onClose={() => setIsModalOpen(false)} 
          onAddToCart={() => {
            setIsModalOpen(false);
            handleAddToCart();
          }} 
        />
      )}
    </>
  );
}
