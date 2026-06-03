import React, { useState } from 'react';
import './AdminOrderCart.css';

const AdminOrderCart = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { 
    productName, 
    quantity, 
    customerName, 
    wilaya, 
    baladiya, 
    deliveryType, 
    homeAddress, 
    phoneNumber, // Added phone number
    totalPrice 
  } = order;

  const toggleExpand = (e) => {
    // Prevent expansion if clicking buttons
    if (e.target.tagName !== 'BUTTON') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    console.log(`Confirmed: ${productName}`);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    console.log("Cancelled");
  };

  // Helper to render the content
  const CardContent = () => (
    <>
      <div className="OrderCart-header">
        <h2 className="OrderCart-header-title">{productName}</h2>
        <span className="OrderCart-quantity-badge">x{quantity}</span>
      </div>
      
      <hr className="OrderCart-separator" />
      
      <div className="OrderCart-info-section">
        <p className="OrderCart-customer-text"><strong>Client:</strong> {customerName}</p>
        <p className="OrderCart-location-text">{wilaya}, {baladiya}</p>
        
        {/* These details only show when expanded */}
        {isExpanded && (
          <div className="OrderCart-extra-details">
            <p className="OrderCart-phone">📞 {phoneNumber}</p>
            <div className={`OrderCart-delivery-tag ${deliveryType}`}>
              {deliveryType === 'home' ? '🏠 Home Delivery' : '🏢 Office Delivery'}
            </div>
            {deliveryType === 'home' && (
              <p className="OrderCart-address-text">📍 {homeAddress}</p>
            )}
          </div>
        )}

        <p className="OrderCart-price-display">{totalPrice} DZD</p>
      </div>

      <div className="OrderCart-button-group">
        <button className="OrderCart-btn-confirm" onClick={handleConfirm}>Confirm</button>
        <button className="OrderCart-btn-cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </>
  );

  return (
    <>
      {/* The standard card in the grid */}
      <div className="OrderCart-container" onClick={toggleExpand}>
        <CardContent />
      </div>

      {/* The Expanded Overlay */}
      {isExpanded && (
        <div className="OrderCart-overlay" onClick={toggleExpand}>
          <div className="OrderCart-container expanded" onClick={(e) => e.stopPropagation()}>
            <CardContent />
            <button className="OrderCart-close-btn" onClick={toggleExpand}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderCart;