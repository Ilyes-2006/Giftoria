import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import { fetchProducts } from './api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message || 'Unable to load products'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell">
      <Header />

      <main>
        <section className="hero" id="home">
          <div className="container hero-content">
            <h1>Gift curated joy with Giftoria</h1>
            <p>Discover premium gift ideas for every celebration, delivered with care.</p>
            <a href="#products" className="btn btn-primary">Shop Bestsellers</a>
          </div>
        </section>

        <section className="section" id="products">
          <div className="container">
            <div className="section-heading">
              <h2>Featured Products</h2>
              <p>Popular gifts chosen for every mood and moment.</p>
            </div>

            {loading && <p className="status-message">Loading products...</p>}
            {error && <p className="status-message error-message">{error}</p>}
            {!loading && !error && (
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section split" id="about">
          <div className="container about-grid">
            <div>
              <h2>About Giftoria</h2>
              <p>We help you find the perfect gift with curated collections, thoughtful packaging, and fast delivery.</p>
            </div>
            <div className="feature-cards">
              <div className="card">Fast shipping</div>
              <div className="card">Custom gift wrapping</div>
              <div className="card">Secure checkout</div>
            </div>
          </div>
        </section>

        <section className="section newsletter" id="contact">
          <div className="container newsletter-box">
            <h2>Stay in touch</h2>
            <p>Join our newsletter for exclusive offers and new arrivals.</p>
            <form
              className="newsletter-form"
              onSubmit={(event) => {
                event.preventDefault();
                alert('Thanks for subscribing to Giftoria updates!');
              }}
            >
              <input type="email" placeholder="Enter your email" required />
              <button className="btn btn-secondary">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
