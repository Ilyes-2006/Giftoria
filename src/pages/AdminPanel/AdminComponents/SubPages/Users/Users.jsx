import React from 'react';
import './Users.css';
import StatCart from '../../StatCart/StatCart'; 
import UserCart from '../../UserCart/UserCart'; 

export default function Users ({ users }) {

  const isDataValid = Array.isArray(users);
  const userCount = isDataValid ? users.length : 0;

  return (
    <div className="users-page-container">
      <div className="subpage-stats-wrapper">
        {/* Pass the safe count here */}
        <StatCart label="Users" value={userCount} />
      </div>

      <hr className="admin-section-divider" />
      <h2 className="admin-section-title">Users</h2>

      <div className="users-grid-layout">
        {/* 2. Only map if it's actually an array */}
        {isDataValid ? (
          users.map((user, index) => (
            <UserCart key={index} user={user} />
          ))
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};