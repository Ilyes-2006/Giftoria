import './Shop.css';
import ProductCard from '../../components/UI/ProductCard/ProductCard';
import { useState } from 'react';
import PageHero from '../../components/UI/PageHero/PageHero';
import Delivery from '../../components/UI/Delivery/Delivery';

export default function Shop({user}) {
  // 1. All State definitions must be at the top level of the component
  const [activeSorts, setActiveSorts] = useState([]);
  const [priceDirection, setPriceDirection] = useState('none');
  const [selectedType, setSelectedType] = useState('All Products');
  
  // 2. Logic functions
  const handleAddToCart = (product) => {
  console.log("Added to cart:", product);
  };
  const toggleSort = (choice) => {
    setActiveSorts(prev =>
      prev.includes(choice)
        ? prev.filter(item => item !== choice)
        : [...prev, choice]
    );
  };

  const handlePriceClick = () => {
    if (priceDirection === 'none') {
      setPriceDirection('low');
      if (!activeSorts.includes('price')) setActiveSorts([...activeSorts, 'price']);
    } else if (priceDirection === 'low') {
      setPriceDirection('high');
    } else {
      setPriceDirection('none');
      setActiveSorts(activeSorts.filter(item => item !== 'price'));
    }
  };

  const products = [
    { id: 1, name: 'Coffret de Chocolats', price: 29.99, image: '/assets/product-images/product-image1.jpg' },
    { id: 2, name: 'Bouquet de Fleurs', price: 49.99, image: '/assets/product-images/product-image2.jpg' },
    { id: 3, name: 'Parfum de Luxe', price: 79.99, image: '/assets/product-images/product-image3.jpg' },
    { id: 4, name: 'Montre Élégante', price: 199.99, image: '/assets/product-images/product-image4.jpg' },
    { id: 5, name: 'Coffret de Vin', price: 59.99, image: '/assets/product-images/product-image1.jpg' },
    { id: 6, name: 'Bijoux Fantaisie', price: 39.99, image: '/assets/product-images/product-image2.jpg' },
  ];

  const eventTypes = [
    'All Products', 'Anniversary Gifts', 'Graduation Gifts', 
    'Personalized Gifts', 'Gift boxes', 'luxury Gifts', 
    'Valentine’s Gifts', 'Wedding Gifts', 'Birthday Gifts'
  ];

  return (
    <div className="shop-page">
      <PageHero title="Shop Gifts" subtitle="find the perfect gift for every occasion" />
      <div className='shop-page-main-navbar'>
        <div className="nav-left">
          <p>Showing <strong>{products.length}</strong> products</p>
        </div>

        <div className="nav-center">
          <input type="search" placeholder="Search gifts..." className="shop-search-input" />
        </div>

        <div className="nav-right">
          <span className="sort-label">Sort by:</span>

          <button
            className={`btn-choice ${activeSorts.includes('popularity') ? 'active' : ''}`}
            onClick={() => toggleSort('popularity')}
          >
            Popularity
          </button>

          <button
            className={`btn-choice ${activeSorts.includes('newest') ? 'active' : ''}`}
            onClick={() => toggleSort('newest')}
          >
            Newest
          </button>

          <button
            className={`btn-choice price-btn ${activeSorts.includes('price') ? 'active' : ''}`}
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
            {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              user={user}
              onAddToCart={handleAddToCart}
            />            ))}
          </div>
        </section>
      </div>
     <Delivery></Delivery>
    </div>
  );
}