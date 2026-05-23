    import React, { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';
    import ProductCard from '../ProductCard/ProductCard';
    import { useCart } from '../../../hooks/useCart';
    import { fetchProducts } from '../../../services/api';
    import './View-more.css';

    export default function ViewMore({title, user}) {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch exactly 4 products for the home page preview
        fetchProducts(4)
        .then(data => {
            if (data && data.length > 0) {
              const availableProducts = data.filter(p => p.quantity !== 0);
              setProducts(availableProducts);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Failed to load products from API:", err);
            setError("Failed to load products");
            setLoading(false);
        });
    }, []);



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
                    products.map((product) => (
                        <ProductCard
                        key={product.id}
                        product={product}
                        image={product.image}
                        onAddToCart={addToCart}
                        user={user}
                        />
                    ))
                    ) : (
                    <p className="status-message">No products available.</p>
                    )}
                </div>
                <div className="view-more-wrapper">
                    <Link to="/Shop" className="view-more-link">
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