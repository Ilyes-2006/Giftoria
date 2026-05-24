import React, { useState } from 'react';
import { updateOrderStatus, deleteOrder } from '../../../../services/api';
import './AdminOrderCart.css';

const AdminOrderCart = ({ order, onUpdateOrderStatus, onDeleteOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  const { 
    id,
    products = [], 
    customerName, 
    wilaya, 
    baladiya, 
    deliveryType, 
    homeAddress, 
    phoneNumber,
    totalPrice,
    status = 'Pending'
  } = order;

  // Calculate total items
  const totalItems = products.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
  // Format title for collapsed view
  const primaryProduct = products[0]?.name || "Gift Order";
  const extraItemsCount = products.length > 1 ? products.length - 1 : 0;
  const titleText = extraItemsCount > 0 ? `${primaryProduct} & +${extraItemsCount} more` : primaryProduct;

  const toggleExpand = (e) => {
    // Prevent expansion if clicking buttons or floating panel overlays
    if (e.target.tagName !== 'BUTTON' && !e.target.closest('.AdminOrder-floating-overlay')) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleConfirmClick = (e) => {
    e.stopPropagation();
    setShowConfirmModal(true);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setShowCancelModal(true);
  };

  const handleConfirmOrder = async (e) => {
    e.stopPropagation();
    setIsUpdating(true);
    try {
      await updateOrderStatus(id, 'Confirmed');
      if (onUpdateOrderStatus) {
        onUpdateOrderStatus(id, 'Confirmed');
      }
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update order status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelOrder = async (e) => {
    e.stopPropagation();
    setIsUpdating(true);
    try {
      await deleteOrder(id);
      if (onDeleteOrder) {
        onDeleteOrder(id);
      }
      setShowCancelModal(false);
    } catch (error) {
      console.error("Failed to delete order", error);
      alert("Failed to delete order.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeliveredClick = async (e) => {
    e.stopPropagation();
    setIsUpdating(true);
    try {
      await updateOrderStatus(id, 'Delivered');
      if (onUpdateOrderStatus) {
        onUpdateOrderStatus(id, 'Delivered');
      }
    } catch (error) {
      console.error("Failed to mark order as delivered", error);
      alert("Failed to update status to Delivered.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper to render the content
  const CardContent = () => {
    const normalizedStatus = status.toLowerCase();
    return (
      <>
        <div className="OrderCart-header">
          <h2 className="OrderCart-header-title" title={titleText}>{titleText}</h2>
          <span className="OrderCart-quantity-badge">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
        </div>
        
        <div className="OrderCart-status-container">
          <span className={`OrderCart-status-badge status-${normalizedStatus.replace(' ', '-')}`}>
            {status}
          </span>
        </div>
        
        <hr className="OrderCart-separator" />
        
        <div className="OrderCart-info-section">
          <p className="OrderCart-customer-text"><strong>Client:</strong> {customerName}</p>
          <p className="OrderCart-location-text">{wilaya}, {baladiya}</p>
          
          {/* These details only show when expanded */}
          {isExpanded && (
            <div className="OrderCart-extra-details">
              <p className="OrderCart-phone">📞 {phoneNumber || 'N/A'}</p>
              <div className={`OrderCart-delivery-tag ${deliveryType}`}>
                {deliveryType === 'home' ? '🏠 Home Delivery' : '🏢 Office Delivery'}
              </div>
              {deliveryType === 'home' && (
                <p className="OrderCart-address-text">📍 {homeAddress}</p>
              )}
              
              <div className="OrderCart-products-list">
                <h4 className="OrderCart-products-list-title">Ordered Items:</h4>
                <ul className="OrderCart-products-ul">
                  {products.map((p, idx) => (
                    <li key={idx} className="OrderCart-product-li">
                      <img src={p.image} alt={p.name} className="OrderCart-product-img" />
                      <div className="OrderCart-product-info">
                        <span className="OrderCart-product-name">{p.name}</span>
                        <span className="OrderCart-product-qty">Qty: {p.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <p className="OrderCart-price-display">{totalPrice} DZD</p>
        </div>

        {normalizedStatus === 'pending' && (
          <div className="OrderCart-button-group">
            <button 
              className="OrderCart-btn-confirm" 
              onClick={handleConfirmClick}
              disabled={isUpdating}
            >
              {isUpdating ? '...' : 'Confirm'}
            </button>
            <button 
              className="OrderCart-btn-cancel" 
              onClick={handleCancelClick}
              disabled={isUpdating}
            >
              {isUpdating ? '...' : 'Cancel'}
            </button>
          </div>
        )}

        {normalizedStatus === 'confirmed' && (
          <div className="OrderCart-button-group">
            <button 
              className="OrderCart-btn-delivered" 
              onClick={handleDeliveredClick}
              disabled={isUpdating}
            >
              {isUpdating ? '...' : 'Delivered'}
            </button>
          </div>
        )}

        {normalizedStatus === 'delivered' && (
          <div className="OrderCart-history-badge">
            <span>✓ Order Delivered (Read-Only)</span>
          </div>
        )}
      </>
    );
  };

  const normalizedStatus = status.toLowerCase();

  return (
    <>
      {/* The standard card in the grid */}
      <div className={`OrderCart-container ${normalizedStatus === 'cancelled' ? 'cancelled-card' : ''}`} onClick={toggleExpand}>
        <CardContent />
      </div>

      {/* The Expanded Overlay */}
      {isExpanded && (
        <div className="OrderCart-overlay" onClick={() => setIsExpanded(false)}>
          <div className="OrderCart-container expanded" onClick={(e) => e.stopPropagation()}>
            <CardContent />
            <button className="OrderCart-close-btn" onClick={() => setIsExpanded(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Floating Panel for Order Confirmation */}
      {showConfirmModal && (
        <div className="AdminOrder-floating-overlay" onClick={(e) => { e.stopPropagation(); setShowConfirmModal(false); }}>
          <div className="AdminOrder-floating-panel" onClick={(e) => e.stopPropagation()}>
            <div className="AdminOrder-floating-header">
              <h3>Confirm Order #{id}</h3>
              <button type="button" className="AdminOrder-floating-close-btn" onClick={() => setShowConfirmModal(false)}>&times;</button>
            </div>
            <div className="AdminOrder-floating-body">
              <p>Are you sure you want to <strong>confirm</strong> this order for <strong>{customerName}</strong>?</p>
              <p className="AdminOrder-floating-warning">This will change the order status to <strong>Confirmed</strong>, allowing you to mark it as Delivered later.</p>
            </div>
            <div className="AdminOrder-floating-actions">
              <button className="AdminOrder-btn-secondary" onClick={() => setShowConfirmModal(false)}>No, Go Back</button>
              <button className="AdminOrder-btn-primary" onClick={handleConfirmOrder} disabled={isUpdating}>
                {isUpdating ? 'Confirming...' : 'Yes, Confirm Order'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Panel for Order Cancellation (Delete Forever) */}
      {showCancelModal && (
        <div className="AdminOrder-floating-overlay" onClick={(e) => { e.stopPropagation(); setShowCancelModal(false); }}>
          <div className="AdminOrder-floating-panel delete-panel" onClick={(e) => e.stopPropagation()}>
            <div className="AdminOrder-floating-header">
              <h3>Delete Order #{id}</h3>
              <button type="button" className="AdminOrder-floating-close-btn" onClick={() => setShowCancelModal(false)}>&times;</button>
            </div>
            <div className="AdminOrder-floating-body">
              <p>Are you sure you want to <strong>cancel and delete</strong> this order forever?</p>
              <p className="AdminOrder-floating-danger-warning">⚠️ WARNING: This action is permanent and cannot be undone. The order will be deleted from the database forever.</p>
            </div>
            <div className="AdminOrder-floating-actions">
              <button className="AdminOrder-btn-secondary" onClick={() => setShowCancelModal(false)}>No, Keep Order</button>
              <button className="AdminOrder-btn-danger" onClick={handleCancelOrder} disabled={isUpdating}>
                {isUpdating ? 'Deleting...' : 'Yes, Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderCart;
