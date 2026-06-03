import React from 'react';
import AdminOrderCart from '../../AdminOrderCart/AdminOrderCart'; 
import StatCart from '../../StatCart/StatCart';
import './Orders.css';

export default function Orders({ orders  }) {
  const isDataValid = Array.isArray(orders);
  const orderCount = isDataValid ? orders.length : 0;
  return (
    <div className="OrdersPage-wrapper">
      <div className="subpage-stats-wrapper">
        <StatCart label="Orders" value={orderCount} />
      </div>

      {/* Content Section */}
      {/* <div className="OrdersPage-content"> */}
        <hr className="admin-section-divider" />
        <h3 className="admin-section-title">Orders to confirm</h3>
        
        <div className="OrdersPage-grid">

          {isDataValid ? 
          (orders.map((order, index) => (
            <AdminOrderCart key={order.id || index} order={order} />
          ))
          ):(
            <p>No order data available.</p>
          )}
        </div>
      </div>
    // </div>
  );
};

