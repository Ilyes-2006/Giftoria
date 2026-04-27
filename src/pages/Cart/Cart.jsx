import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Cart.css';
import ViewMore from '../../components/UI/View-more/View-more';
import Delivery from '../../components/UI/Delivery/Delivery';  
import PageHero from '../../components/UI/PageHero/PageHero';
import OrderSummary from '../../components/UI/OrderSummary/OrderSummary';

const Cart = () => {
  const navigate = useNavigate();
  const [cartitems, setcartitems] = useState([
  { id: 1, name: "Gift Item", price: 4500, quantity: 1, stock: 3, image: "/assets/product-images/product-image1.jpg" },
  { id: 2, name: "Gift Item", price: 1100, quantity: 2, stock: 5, image: "/assets/product-images/product-image2.jpg" }
]);
  

const handleCheckout = () => {
  navigate('/checkout',{ state: { cartitems } });
};

const updateQty = (id, delta) => {
  setcartitems(prev => prev.map(item => {
    if (item.id === id) {
      const newQty = item.quantity + delta;
      // Constraint: min 1, max 5, and cannot exceed stock
      const maxAllowed = Math.min(5, item.stock);
      if (newQty >= 1 && newQty <= maxAllowed) {
        return { ...item, quantity: newQty };
      }
    }
    return item;
  }));
};

  const shippingFee = 500;
  const subtotal = cartitems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + shippingFee;

  return (
    <div className="cart-page">
      <PageHero title="Your Cart" subtitle="Review your item before checkout" />
      
      <main className="cart-main">
        
        <section className="card-main-section cart-orders">
          {cartitems.map((item, index) => (
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
                      
                      <span>{item.quantity}</span>
                      
                      <button 
                        onClick={() => updateQty(item.id, 1)}
                        className={(item.quantity === 5 || item.quantity === item.stock) ? "disabled-btn" : ""}
                      >+</button>
                    </div>
                    <button className="btn-remove">Remove</button>
                  </div>
                </div>
              </div>
              {index !== cartitems.length - 1 && <hr className="divider-sub" />}
            </React.Fragment>
          ))}
        </section>

        {/* Right Side: Summary */}
       <OrderSummary  cartitems={cartitems} variant={"cart"} />
      </main>
       <ViewMore title="You Might also Like"></ViewMore>
      <Delivery></Delivery>
    </div>
  );
};

export default Cart;