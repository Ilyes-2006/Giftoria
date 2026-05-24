import './Shop.css';
import ShopProductCard from '../../components/UI/ShopProductCard/ShopProductCard';
import { useState, useEffect } from 'react';
import PageHero from '../../components/UI/PageHero/PageHero';
import Delivery from '../../components/UI/Delivery/Delivery';
import { fetchProducts } from '../../services/api';
import { useCart } from '../../hooks/useCart';

export default function Shop({user}) {
  // All State definitions must be at the top level of the component
  const [products, setProducts] = useState([
    { id: 1, name: 'Coffret de Chocolats', price: 1200, image: '/assets/product-images/product-image1.jpg', category: 'Birthday' },
    { id: 2, name: 'Bouquet de Fleurs', price: 1800, image: '/assets/product-images/product-image2.jpg', category: 'Wedding' },
    { id: 3, name: 'Parfum de Luxe', price: 2800, image: '/assets/product-images/product-image3.jpg', category: 'Anniversary' },
    { id: 4, name: 'Montre Élégante', price: 3000, image: '/assets/product-images/product-image4.jpg', category: 'luxury' },
    { id: 5, name: 'Coffret de Vin', price: 2200, image: '/assets/product-images/product-image1.jpg', category: 'Gift boxes' },
    { id: 6, name: 'Bijoux Fantaisie', price: 1500, image: '/assets/product-images/product-image2.jpg', category: 'Personalized' }
  ]);
  const [priceDirection, setPriceDirection] = useState('none');
  const [selectedType, setSelectedType] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { addToCart } = useCart();

  // Load products from backend API
  useEffect(() => {
    fetchProducts()
      .then(data => {
        if (data && data.length > 0) {
          const availableProducts = data.filter(p => p.quantity !== 0);
          setProducts(availableProducts);
        }
      })
      .catch(err => {
        console.error("Failed to load products from API, using default items:", err);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handlePriceClick = () => {
    if (priceDirection === 'none') {
      setPriceDirection('low');
    } else if (priceDirection === 'low') {
      setPriceDirection('high');
    } else {
      setPriceDirection('none');
    }
  };

  const dynamicCategories = Array.from(new Set(products.map(p => (p.category || 'General').trim())));
  const eventTypes = ['All Products', ...dynamicCategories];

  // Filtering by category & search query
  const filteredProducts = products.filter(product => {
    // Category match
    let matchesCategory = true;
    if (selectedType !== 'All Products') {
      const cleanType = selectedType.toLowerCase().trim();
      const prodCategory = (product.category || '').toLowerCase().trim();

      matchesCategory = prodCategory === cleanType;
      
      // Marriage and wedding mapping
      if (!matchesCategory) {
        if (cleanType === 'wedding' && prodCategory === 'marriage') matchesCategory = true;
        if (cleanType === 'marriage' && prodCategory === 'wedding') matchesCategory = true;
      }
    }

    // Search query match
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sorting by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (priceDirection === 'low') {
      return a.price - b.price;
    }
    if (priceDirection === 'high') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="shop-page">
      <PageHero title="Shop Gifts" subtitle="find the perfect gift for every occasion" />
      <div className='shop-page-main-navbar'>
        <div className="nav-left">
          <p>Showing <strong>{sortedProducts.length}</strong> products</p>
        </div>

        <div className="nav-center">
          <input 
            type="search" 
            placeholder="Search gifts..." 
            className="shop-search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="nav-right">
          <span className="sort-label">Sort by:</span>

          <button
            className={`btn-choice price-btn ${priceDirection !== 'none' ? 'active' : ''}`}
            onClick={handlePriceClick}
          >
            <div className="price-content-wrapper">
              <span className="price-text">
                {priceDirection === 'none' && "Price"}
                {priceDirection === 'low' && "Price: Low-High"}
                {priceDirection === 'high' && "Price: High-Low"}
              </span>
              <span className="price-placeholder" aria-hidden="true">
                Price: High-Low
              </span>
            </div>
            <i className={`fas fa-sort${priceDirection === 'low' ? '-up' : priceDirection === 'high' ? '-down' : ''}`}></i>
          </button>
        </div>
      </div>

      <div className="shop-layout-container">
        <aside className="filter-section">
          <div className="filter-content">
            {eventTypes.map((type, index) => (
              <div key={type}>
                <p
                  className={`filter-item ${selectedType === type ? 'active-type' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </p>
                {index < eventTypes.length - 1 && <hr className="filter-divider" />}
              </div>
            ))}
          </div>
        </aside>

        <section className="products-display-section">
          <div className="products-grid">
            {sortedProducts.map(product => (
              <ShopProductCard
                key={product.id}
                product={product}
                user={user}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </div>
      <Delivery />
    </div>
  );
}
