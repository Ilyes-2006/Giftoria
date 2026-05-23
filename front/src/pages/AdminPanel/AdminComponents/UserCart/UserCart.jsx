import React, { useState } from 'react';
import './UserCart.css';

export default function UserCart({ user, onRemove }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      if (onRemove) {
        await onRemove();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete user');
    } finally {
      setShowConfirm(false);
    }
  };

  const handleOverlayClick = (e, setModalState) => {
    if (e.target === e.currentTarget) {
      setModalState(false);
    }
  };

  return (
    <div className="admin-user-card">
      <div className="admin-user-info">
        <h4>{user.username || user.name}</h4>
        <hr />
        <p className="admin-user-email">{user.email}</p>
      </div>
      <hr />
      <div className="admin-card-footer">
        {onRemove && (
          <button className="admin-btn-remove" onClick={() => setShowConfirm(true)}>Remove</button>
        )}
      </div>

      {showConfirm && (
        <div className="admin-user-floating-overlay" onClick={(e) => handleOverlayClick(e, setShowConfirm)}>
          <div className="admin-user-floating-panel">
            <div className="admin-user-floating-header">
              <h3>Delete User</h3>
              <button type="button" className="admin-user-floating-close-btn" onClick={() => setShowConfirm(false)}>&times;</button>
            </div>
            <div className="admin-user-floating-body">
              <p>Are you sure you want to delete user <strong>{user.username || user.name}</strong> ({user.email}) forever?</p>
              <div className="admin-user-floating-danger-warning">
                ⚠️ WARNING: This action is permanent and cannot be undone. The user account will be deleted from the database forever.
              </div>
            </div>
            <div className="admin-user-floating-actions">
              <button className="admin-user-btn-secondary" onClick={() => setShowConfirm(false)}>
                No, Keep User
              </button>
              <button className="admin-user-btn-danger" onClick={handleConfirmDelete}>
                Yes, Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}