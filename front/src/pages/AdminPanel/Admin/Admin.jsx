import React, { useState } from 'react';
import './Admin.css';

import Dashboard from '../AdminComponents/SubPages/Dashboard/Dashboard';
import Users from '../AdminComponents/SubPages/Users/Users';
import Products from '../AdminComponents/SubPages/Products/Products';
import AddProduct from '../AdminComponents/SubPages/AddProduct/AddProduct';
import Orders from '../AdminComponents/SubPages/Orders/Orders';
// import LogOut from '../AdminComponents/SubPages/LogOut/LogOut';

export default function Admin({products,users,orders, onUpdateOrderStatus, onDeleteOrder, onAddProduct, onUpdateProduct, onDeleteProduct, onDeleteUser}) {
  // 1. Set the default active tab to 'Dashboard'
  const [activeTab, setActiveTab] = useState('Dashboard');

  // 2. Data structure for our navigation items
  const menuItems = [
    { name: 'Dashboard', component: <Dashboard products={products} users={users} orders={orders} onNavigate={setActiveTab} onDeleteUser={onDeleteUser} onDeleteProduct={onDeleteProduct} onUpdateProduct={onUpdateProduct} onAddProduct={onAddProduct}/> },
    { name: 'Users', component: <Users users={users} onDeleteUser={onDeleteUser}/> },
    { name: 'Products', component: <Products products={products} onUpdateProduct={onUpdateProduct} onDeleteProduct={onDeleteProduct}/> },
    { name: 'Add product', component: <AddProduct products={products} onAddProduct={onAddProduct}/> },
    { name: 'Orders', component: <Orders orders={orders} onUpdateOrderStatus={onUpdateOrderStatus} onDeleteOrder={onDeleteOrder}/> },
  ];

  // 3. Find the currently active item to display its component
  const activeItem = menuItems.find(item => item.name === activeTab) || menuItems[0];

  return (
    <div className="admin-main-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo-box">
          <img src="/assets/gift.png" alt="giftoria logo" className='admin-giftoria-image' />
          <img src="/assets/admin-giftoria-text.png" alt="giftoria logo text" className='admin-giftoria-logo' />
        </div>

        <nav className="admin-nav-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`admin-nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.name}
            </button>
          ))}
          <button className="admin-nav-item admin-logout">Log out</button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content-wrapper">
        {/* Static Header Section - Title updates based on activeTab */}
        <header className="admin-header-section">
          <h1 className="admin-page-title">Dashboard Overview</h1>
          <p className="admin-page-subtitle">Manage your store easily</p>
        </header>

        {/* Dynamic Sub-page Area */}
        <div className="admin-subpage-content">
          {activeItem.component}
        </div>
      </main>
    </div>
  );
}
