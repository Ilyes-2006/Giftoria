import React  from "react";
import "./OrderSummary.css";

import { Link } from "react-router-dom";

export default function OrderSummary({ cartitems=[], variant, shippingFee = 500, onPlaceOrder }) {
  
  const isEmpty = cartitems.length === 0;
  const effectiveShipping = isEmpty ? 0 : shippingFee;
  const subtotal = cartitems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + effectiveShipping;  
  return (
    <section className="card-main-section card-orders-summary">
        
        <h2>Order Summary</h2>
        <hr className="divider-sub"/>
        {variant === "checkout" && (
          <div className="checkout-orders orders-summary-section">
            {cartitems.map((item) => (
              <div key={item.id} className="cart-summary-row">
                <span>{item.name}</span>
                <span className="order-summary-price">{item.quantity} x {item.price} DZD</span>
              </div>
            ))}
            <hr className="divider-sub divider-sub2" />
          </div>
        )} 
        <div className="orders-summary-section">
            <div className="cart-summary-row">
                <span>Subtotal</span>
                <span className="order-summary-price">{subtotal} DZD</span>
            </div>
            {!isEmpty && (
              <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span className="order-summary-price">
                    {effectiveShipping === 0 ? 'Free' : `${effectiveShipping} DZD`}
                  </span>
              </div>
            )}
        </div>
       
          
          <div className="total-container">
            <p className="total-label">TOTAL</p>
            <p className="total-amount">{total} DZD</p>
            {variant === "cart" && (
              <Link to="/Checkout" state={{cartitems: cartitems}}>
                <button className="btn-checkout">Proceed to Checkout</button>
              </Link>
            )}
            {variant === "checkout" && (
              <button
                className="btn-checkout"
                disabled={isEmpty}
                style={isEmpty ? { opacity: 0.45, cursor: 'not-allowed' } : {}}
                onClick={onPlaceOrder}
              >
                Place Order
              </button>
            )}
          </div>
        </section>
    )
}