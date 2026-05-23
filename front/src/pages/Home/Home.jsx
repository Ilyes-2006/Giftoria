import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/UI/ProductCard/ProductCard';
import { subscribeNewsletter } from '../../services/api';
import { useCart } from '../../hooks/useCart';
import './Home.css';
import Delivery from '../../components/UI/Delivery/Delivery';
import ViewMore from '../../components/UI/View-more/View-more';

export default function Home({ user }) {
  
  
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const { addToCart } = useCart();

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');

    try {
      setNewsletterStatus('Subscribing...');
      await subscribeNewsletter(email);
      setNewsletterStatus('Thanks for subscribing to Giftoria updates!');
      e.target.reset();
      setTimeout(() => setNewsletterStatus(''), 3000);
    } catch (err) {
      setNewsletterStatus('Subscription failed. Please try again.');
      console.error('Newsletter subscription error:', err);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">
            <span>Find the Perfect</span>
            <span>Gift for Every</span>
            <span>Moment</span>
          </h1>
          <p>Fast delivery across Algeria</p>
          <div className="hero-action">
            <Link to="/Shop">
              <button className="discover-btn">Discover Gifts</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="../assets/gifts.png" alt="Gift selection" />
        </div>
      </section>
      <ViewMore title="Find the Ideal Gift" user={user}></ViewMore>
    
      <div className="why">
      <div className="heading">
        <h2>Why Choose Us</h2>
      </div>
      <div className="features-grid">
      <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast shipping</h3>
            <p>Delivered quickly to your doorstep</p>
      </div>
      <div className="feature-card">
          <div className="feature-icon">🎁</div>
          <h3>Custom gift wrapping</h3>
          <p>Beautifully wrapped with care</p>
      </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure checkout</h3>
          <p>Your payment is safe and protected</p>
        </div>
      </div>
      </div>
      <div className="ready-section">
        <div className="heading" id='ready'>
          <h2>Ready to surprise someone?</h2>
        </div>
        <div className="join">
          <p>Join our community and receive exclusive gift ideas and special offers.</p>
          <button>Join Now</button>
        </div>
       <Delivery></Delivery>
      </div>
          
    </div>
  );
}
