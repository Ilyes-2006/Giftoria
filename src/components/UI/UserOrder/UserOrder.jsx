import React from 'react';
import './UserOrder.css';

export default function UserOrder({ order }) {
  const products = order.products || [];
  const totalPrice = order.totalPrice || 0;
  const status = order.status || 'Pending';

  const statusClass = status.toLowerCase().replace(/\s+/g, '-');
  const isDelivered = status.toLowerCase() === 'delivered';
  const isCancelled = status.toLowerCase() === 'cancelled';

  return (
    <div className={`uo-card ${isCancelled ? 'uo-card--cancelled' : ''}`}>

      {/* ── Left: order info + product photos in a row ── */}
      <div className="uo-left">
        {/* Order header */}
        <div className="uo-header">
          <span className="uo-order-number">Order #{order.id}</span>
          <span className="uo-items-count">{products.length} {products.length === 1 ? 'item' : 'items'}</span>
        </div>

        {/* Product row: photo + name side by side */}
        <div className="uo-products">
          {products.map((product, idx) => (
            <div key={product.id || idx} className="uo-product-row">
              <img
                src={product.image}
                alt={product.name}
                className="uo-product-thumb"
              />
              <div className="uo-product-text">
                <span className="uo-product-name">{product.name}</span>
                <span className="uo-product-qty">× {product.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: total + status ── */}
      <div className="uo-right">
        <div className="uo-summary-box">
          <p className="uo-total-label">Total</p>
          <p className="uo-total-value">{totalPrice.toLocaleString()} <span className="uo-currency">DZD</span></p>
          <span className={`uo-status-badge uo-status--${statusClass}`}>
            {isDelivered ? '✔ ' : isCancelled ? '✕ ' : '⏳ '}
            {status}
          </span>
        </div>
      </div>

    </div>
  );
}
