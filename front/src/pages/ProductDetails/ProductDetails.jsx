import { useEffect, useState } from 'react';
import { fetchProductById } from '../../services/api';
import { useCart } from '../../hooks/useCart';
import './ProductDetails.css';

export default function ProductDetails({ productId = '1' }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setQuantity(1);
      alert(`${product.name} added to cart!`);
    }
  };

  if (loading) {
    return <div className="product-details-page"><p>Loading product...</p></div>;
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <p className="error-message">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="details-container">
        <div className="product-image-section">
          <img
            src={product.image || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="product-image-large"
          />
        </div>

        <div className="product-details-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description-detail">{product.description}</p>
          
          <div className="price-section">
            <span className="price-label">Price</span>
            <span className="price-value">${product.price.toFixed(2)}</span>
          </div>

          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="qty-input"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <div className="product-features">
            <h3>Product Features</h3>
            <ul>
              <li>Premium quality packaging</li>
              <li>Fast and reliable shipping</li>
              <li>30-day satisfaction guarantee</li>
              <li>Secure and easy checkout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
