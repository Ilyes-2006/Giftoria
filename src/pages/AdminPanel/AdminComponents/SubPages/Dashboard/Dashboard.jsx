import React from 'react';
import './Dashboard.css';
import StatCart from '../../StatCart/StatCart';
import UserCart from '../../UserCart/UserCart';
import AdminProductCart from '../../AdminProductCart/AdminProductCart';
import NewProduct from '../../NewProduct/NewProduct'
export default function Dashboard({products,users,orders,onNavigate,onDeleteUser,onDeleteProduct,onUpdateProduct,onAddProduct}) {
  
  const userCount = Array.isArray(users) ? users.length : 0;
  const productCount = Array.isArray(products) ? products.length : 0;
  const orderCount = Array.isArray(orders) ? orders.length : 0;

  return (
    <div className="admin-dashboard-view">
      {/* Stats Section */}
      <section className="admin-stats-grid">
        <StatCart label="Users" value={userCount} />
        <StatCart label="Products" value={productCount} />
        <StatCart label="Orders" value={orderCount} />
      </section>

      {/* Users Section */}
      <section className="admin-section-group">
        <hr className="admin-section-divider"/>
        <h3 className="admin-section-title">Users</h3>
        <div className="admin-users-list">
          {users.slice(0,2).map((user, i) => (
            <UserCart key={i} user={user} className="user-cart" onRemove={onDeleteUser ? () => onDeleteUser(user.id) : null} />
          ))}
        </div>
        <button className="admin-link-more" onClick={() => onNavigate && onNavigate('Users')}>Show more ❯</button>
      </section>

      {/* Products Section */}
      <section className="admin-section-group">
        <hr className="admin-section-divider"/>
        <h3 className="admin-section-title">Products</h3>
        <div className="admin-products-list">
          {products.slice(0, 2).map((product, i) => (
            <AdminProductCart 
              key={i} 
              product={product} 
              onEdit={onUpdateProduct ? (updatedData) => onUpdateProduct(product.id, updatedData) : null}
              onRemove={onDeleteProduct ? () => onDeleteProduct(product.id) : null}
            />
          ))}
        </div>
        <button className="admin-link-more" onClick={() => onNavigate && onNavigate('Products')}>Show more ❯</button>
      </section>
      {/* Add product section */}
      <section className="admin-section-group">
          <hr className="admin-section-divider"/>
          <h3 className="admin-section-title">Add Product</h3>
          <NewProduct onAddProduct={onAddProduct} />
      </section>
    </div>
  );
}