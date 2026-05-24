import React, { useState } from 'react';
import './AdminProductCart.css';

export default function AdminProductCart({ product, onEdit, onRemove }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Edit fields
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category || 'Birthday');
  const [description, setDescription] = useState(product.description || '');
  const [quantity, setQuantity] = useState(product.quantity || 0);
  const [image, setImage] = useState(product.image);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Birthday", "Graduation", "Marriage", "Anniversary", 
    "Corporate Event", "Baby Shower", "Engagement", 
    "Holiday Party", "Workshop", "Seminar", "All Events"
  ];

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || price === "" || quantity === "") {
      alert("Name, Price and Quantity are required!");
      return;
    }
    if (Number(price) < 0 || Number(quantity) < 0) {
      alert("Price and Quantity cannot be negative!");
      return;
    }
    setIsSubmitting(true);
    try {
      if (onEdit) {
        await onEdit({
          name,
          price: Number(price),
          category,
          quantity: Number(quantity),
          image,
          description
        });
      }
      setShowEdit(false);
    } catch (err) {
      alert(err.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e, setModalState) => {
    if (e.target === e.currentTarget) {
      setModalState(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsSubmitting(true);
    try {
      if (onRemove) {
        await onRemove();
      }
      setShowDelete(false);
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-product-cart">
      <div className="admin-product-thumb">
        <img src={product.image || '/assets/default-product.jpg'} alt={product.name} />
      </div>
      <div className="admin-product-details">
        <h4>{product.name}</h4>
        <hr />
        <p className="admin-product-price">{product.price} DZD</p>
        {product.category && <span className="admin-product-category-tag">{product.category}</span>}
      </div>

      <div className="admin-product-actions">
        <p className="admin-product-qty-text">Quantity: {product.quantity !== undefined ? product.quantity : 0}</p>
        
        <div className="admin-action-btns-row">
          <button className="admin-btn-edit" onClick={() => setShowEdit(true)}>Edit</button>
          <button className="admin-btn-remove" onClick={() => setShowDelete(true)}>Remove</button>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDelete && (
        <div className="admin-prod-floating-overlay" onClick={(e) => handleOverlayClick(e, setShowDelete)}>
          <div className="admin-prod-floating-panel">
            <div className="admin-prod-floating-header">
              <h3>Delete Product</h3>
              <button type="button" className="admin-prod-floating-close-btn" onClick={() => setShowDelete(false)}>&times;</button>
            </div>
            <div className="admin-prod-floating-body">
              <p>Are you sure you want to delete <strong>{product.name}</strong> forever?</p>
              <div className="admin-prod-floating-danger-warning">
                ⚠️ WARNING: This will delete this product from database forever. Customer orders referencing this product ID might show limited info.
              </div>
            </div>
            <div className="admin-prod-floating-actions">
              <button className="admin-prod-btn-secondary" onClick={() => setShowDelete(false)} disabled={isSubmitting}>
                Cancel
              </button>
              <button className="admin-prod-btn-danger" onClick={handleConfirmDelete} disabled={isSubmitting}>
                {isSubmitting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {showEdit && (
        <div className="admin-prod-floating-overlay" onClick={(e) => handleOverlayClick(e, setShowEdit)}>
          <div className="admin-prod-floating-panel edit-panel">
            <div className="admin-prod-floating-header">
              <h3>Edit Product</h3>
              <button type="button" className="admin-prod-floating-close-btn" onClick={() => setShowEdit(false)}>&times;</button>
            </div>
            <form onSubmit={handleSave} className="admin-prod-edit-form">
              
              <div className="form-group-row">
                <label className="form-group-label">Product Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="form-group-input"
                  required
                />
              </div>

              <div className="form-group-row">
                <label className="form-group-label">Price (DZD)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0"
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  className="form-group-input"
                  required
                />
              </div>

              <div className="form-group-row">
                <label className="form-group-label">Quantity</label>
                <input 
                  type="number" 
                  min="0"
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)} 
                  className="form-group-input"
                  required
                />
              </div>

              <div className="form-group-row">
                <label className="form-group-label">Category</label>
                <div className="custom-dropdown-wrapper">
                  <div 
                    className="custom-dropdown-trigger" 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {category}
                  </div>
                  {isDropdownOpen && (
                    <div className="custom-dropdown-menu">
                      {categories.map((cat, idx) => (
                        <div 
                          key={idx} 
                          className="custom-dropdown-item"
                          onClick={() => {
                            setCategory(cat);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group-row">
                <label className="form-group-label">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="form-group-textarea"
                  rows={3}
                />
              </div>

              <div className="form-group-row">
                <label className="form-group-label">Product Image URL</label>
                <div className="image-edit-preview-row" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <img src={image || '/assets/default-product.jpg'} alt="Preview" className="image-edit-preview-thumb" style={{ alignSelf: 'flex-start' }} />
                  <input 
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="form-group-input"
                  />
                </div>
              </div>

              <div className="admin-prod-floating-actions">
                <button type="button" className="admin-prod-btn-secondary" onClick={() => setShowEdit(false)} disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" className="admin-prod-btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}