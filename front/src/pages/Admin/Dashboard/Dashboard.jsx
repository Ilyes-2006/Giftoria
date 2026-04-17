import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-main-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo-section">
          <div className="admin-logo-box">
             <span className="admin-logo-icon">🎁</span>
             <span className="admin-logo-text">Giftoria</span>
          </div>
        </div>
        <nav className="admin-nav-menu">
          <button className="admin-nav-item active">Dashbord</button>
          <button className="admin-nav-item">Users</button>
          <button className="admin-nav-item">Products</button>
          <button className="admin-nav-item">Add product</button>
          <button className="admin-nav-item">Orders</button>
          <button className="admin-nav-item admin-logout">Log out</button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content-wrapper">
        <header className="admin-header-section">
          <h1 className="admin-page-title">Dashbord Overview</h1>
          <p className="admin-page-subtitle">Manage your store easily</p>
        </header>

        {/* Stats Cards */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card">
            <span className="admin-stat-label">Users</span>
            <h2 className="admin-stat-value">120</h2>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">Products</span>
            <h2 className="admin-stat-value">110</h2>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">Orders</span>
            <h2 className="admin-stat-value">22</h2>
          </div>
        </section>

        {/* Users Section */}
        <section className="admin-section-group">
          <h3 className="admin-section-title">Users</h3>
          <div className="admin-users-list">
            {[ {name: 'John Doe', email: 'john@email.com'}, {name: 'Sarah K', email: 'sarah@email.com'} ].map((user, i) => (
              <div key={i} className="admin-user-item-card">
                <div className="admin-user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                <div className="admin-card-footer">
                  <button className="admin-btn-remove">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <button className="admin-link-more">Show more ❯</button>
        </section>

        {/* Products Section */}
        <section className="admin-section-group">
          <h3 className="admin-section-title">Products</h3>
          <div className="admin-products-list">
            {[1, 2].map((_, i) => (
              <div key={i} className="admin-product-item-row">
                <div className="admin-product-thumb">
                  <img src="https://via.placeholder.com/50" alt="product" />
                </div>
                <div className="admin-product-details">
                  <h4>Gold Earrings</h4>
                  <p>6500DZD</p>
                </div>
                <div className="admin-product-actions">
                  <button className="admin-btn-edit">Edit</button>
                  <button className="admin-btn-remove">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <button className="admin-link-more">Show more ❯</button>
        </section>

        {/* Add Product Form */}
        <section className="admin-section-group">
          <h3 className="admin-section-title">Add Product</h3>
          <div className="admin-form-container">
             <input type="text" placeholder="Product Name" className="admin-input-field" />
             <input type="text" placeholder="Price" className="admin-input-field" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;