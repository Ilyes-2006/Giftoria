    import React, { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';
    import ProductCard from '../ProductCard/ProductCard';
    import { useCart } from '../../../hooks/useCart';
    import './View-more.css';

    export default function ViewMore({title}) {
    
    const [loading] = useState(false);
    const [error] = useState(null);
    const { addToCart } = useCart();

    const products = [
        {
        id: 1,
        name: 'Rose Gift Box',
        image: '/assets/product-images/product-image1.jpg',
        price: 5890,
        },
        {
        id: 2,
        name: 'Luxury Candle Set',
        image: '/assets/product-images/product-image2.jpg',
        price: 7290,
        },
        {
        id: 3,
        name: 'Sweet Treat Basket',
        image: '/assets/product-images/product-image3.jpg',
        price: 6490,
        },
        {
        id: 4,
        name: 'Elegant Jewelry Box',
        image: '/assets/product-images/product-image4.jpg',
        price: 8450,
        },
    ];
    
    

    return (
        <div className="view-more">
        <div className="heading">
            <h2>{title}</h2>
        </div>
        {/* Featured Products Section */}
        <section className="cards-section" id="products">
            <div className="section-container cards-container">
            

            {loading && <p className="status-message loading">Loading products...</p>}
            {error && <p className="status-message error">{error}</p>}
            {!loading && !error && (
                <>
                <div className="product-grid">
                    {products.length > 0 ? (
                    products    .slice(0, 4).map((product) => (
                        <ProductCard
                        key={product.id}
                        product={product}
                        image={product.image}
                        onAddToCart={addToCart}
                        />
                    ))
                    ) : (
                    <p className="status-message">No products available.</p>
                    )}
                </div>
                <div className="view-more-wrapper">
                    <Link to="/shop" className="view-more-link">
                    View more products &gt;
                    </Link>
                </div>
                </>
            )}
            </div>
        </section>
        </div>
    );
    }