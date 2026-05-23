import './ShopProductCard.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProductModal from '../ProductModal/ProductModal';

export default function ShopProductCard({ product, onAddToCart, user }) {
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
      <article className="shop-product-card" onClick={() => setIsModalOpen(true)} style={{cursor: 'pointer'}}>
        <div className="shop-product-image-wrapper">
          <img 
            src={product.image || 'https://via.placeholder.com/200'} 
            alt={product.name}
            className="shop-product-image"
          />
        </div>
        <div className="shop-product-info">
          <h3 className="shop-product-name">{product.name}</h3>
          <span className="shop-product-price">{product.price.toFixed(0)} DZD</span>
          <div className="shop-product-footer">
            <button 
              className="shop-btn-add-cart"
              onClick={handleAddToCart}
            >
              Add to cart
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
