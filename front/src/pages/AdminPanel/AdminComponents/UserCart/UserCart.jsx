import React from 'react';
import './UserCart.css';

export default function UserCart({ user, onRemove }) {
  return (
    <div className="admin-user-card">
      <div className="admin-user-info">
        <h4>{user.name}</h4>
        <hr />
        <p>{user.email}</p>
      </div>
      <hr />
      <div className="admin-card-footer">
        <button className="admin-btn-remove" onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
}