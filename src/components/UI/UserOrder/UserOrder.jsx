import React from 'react';
import './UserOrder.css';

export default function UserOrder ({ order }) {
  return (
    <div className="user-order-container">
      <div className="user-order-main">
        <div className="user-order-left">
          <h3 className="user-order-title">{order.title}</h3>
          <div className="user-order-images">
            {order.products.map((product) => (
              <img 
                key={product.id} 
                src={product.image} 
                alt={product.name} 
                className="user-order-img" 
              />
            ))}
          </div>
        </div>

        <div className="user-order-right">
          <div className="user-order-status-wrapper">
             {/* Simple checkmark icon logic */}
            <span className="user-order-check-icon">✔</span>
            <div className="user-order-info">
              <p className="user-order-total">Total : <span>{order.totalPrice} DZD</span></p>
              <p className="user-order-status">Statut : <span>{order.status}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

