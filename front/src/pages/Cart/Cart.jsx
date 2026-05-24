import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Cart.css';
import ViewMore from '../../components/UI/View-more/View-more';
import Delivery from '../../components/UI/Delivery/Delivery';  
import PageHero from '../../components/UI/PageHero/PageHero';
import OrderSummary from '../../components/UI/OrderSummary/OrderSummary';
import { useCart } from '../../hooks/useCart';

const Cart = ({ user, loading }) => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    if (!loading) {
      const token = localStorage.getItem('token');
      if (!token && !user) {
        alert("You have to log in first");
        navigate("/Connexion", { state: { message: "You have to log in first" } });
      }
    }
  }, [user, loading, navigate]);

  const updateQty = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    const newQty = (item.quantity || 1) + delta;
    const maxAllowed = Math.min(5, item.stock || 5);
    if (newQty >= 1 && newQty <= maxAllowed) {
      updateQuantity(id, newQty);
    }
  };

  return (
    <div className="cart-page">
      <PageHero title="Your Cart" subtitle="Review your item before checkout" />
      
      <main className="cart-main">
        {cartItems.length === 0 ? (
          <section className="card-main-section cart-orders" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>Your cart is empty.</p>
          </section>
        ) : (
          <section className="card-main-section cart-orders">
            {cartItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="card-order">
                  <img src={item.image} alt={item.name} className="order-img" />
                  
                  <div className="card-order-info">
                    <p className="order-name">{item.name}</p>
                    <p className="order-desc">{item.description}</p>
                    <div className="price-div">
                      <p>Price:</p>
                      <p>{item.price} DZD</p>
                    </div>

                    <div className="order-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQty(item.id, -1)}
                          className={item.quantity === 1 ? "disabled-btn" : ""}
                        >-</button>
                        
                        <span>{item.quantity || 1}</span>
                        
                        <button 
                          onClick={() => updateQty(item.id, 1)}
                          className={(item.quantity === 5 || item.quantity === (item.stock || 5)) ? "disabled-btn" : ""}
                        >+</button>
                      </div>
                      <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
                {index !== cartItems.length - 1 && <hr className="divider-sub" />}
              </React.Fragment>
            ))}
          </section>
        )}

        {/* Right Side: Summary */}
        <OrderSummary cartitems={cartItems} variant={"cart"} />
      </main>
      <ViewMore title="You Might also Like" user={user}></ViewMore>
      <Delivery></Delivery>
    </div>
  );
};

export default Cart;
