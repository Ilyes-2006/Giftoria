import React from 'react';
import AdminOrderCart from '../../AdminOrderCart/AdminOrderCart'; 
import StatCart from '../../StatCart/StatCart';
import './Orders.css';

export default function Orders({ orders, onUpdateOrderStatus, onDeleteOrder }) {
  const isDataValid = Array.isArray(orders);
  const orderCount = isDataValid ? orders.length : 0;

  // Sort orders: not-delivered (Pending, Confirmed, etc.) first, Delivered last
  const sortedOrders = isDataValid ? [...orders].sort((a, b) => {
    const isADelivered = a.status?.toLowerCase() === 'delivered';
    const isBDelivered = b.status?.toLowerCase() === 'delivered';
    if (isADelivered && !isBDelivered) return 1;
    if (!isADelivered && isBDelivered) return -1;
    return 0;
  }) : [];

  return (
    <div className="OrdersPage-wrapper">
      <div className="subpage-stats-wrapper">
        <StatCart label="Orders" value={orderCount} />
      </div>

      {/* Content Section */}
      {/* <div className="OrdersPage-content"> */}
        <hr className="admin-section-divider" />
        <h3 className="admin-section-title">Orders list</h3>
        
        <div className="OrdersPage-grid">

          {isDataValid && sortedOrders.length > 0 ? 
          (sortedOrders.map((order, index) => (
            <AdminOrderCart 
              key={order.id || index} 
              order={order} 
              onUpdateOrderStatus={onUpdateOrderStatus}
              onDeleteOrder={onDeleteOrder}
            />
          ))
          ):(
            <p>No order data available.</p>
          )}
        </div>
      </div>
    // </div>
  );
};

