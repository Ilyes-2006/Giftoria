import React from 'react';
import './StatCart.css';

export default function StatCart({ label, value }) {
  return (
    <div className="admin-stat-card">
      <span className="admin-stat-label">{label}</span>
      <hr />
      <h2 className="admin-stat-value">{value}</h2>
    </div>
  );
}