import React, { use, useState } from "react";
import "./Profile.css";
import PageHero from "../../components/UI/PageHero/PageHero";
import Delivery from "../../components/UI/Delivery/Delivery";
import UserOrder from "../../components/UI/UserOrder/UserOrder";
export default function Profile({orders,user}) {
  const [active, setActive] = useState("My Profile");

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Password update requested!");
  };

 
  return (
    <div className="page-container">

    <PageHero title="User Account" subtitle="Manage your profile    "/>  

        <main className="content-wrapper">
          <div className="settings-layout">
            
            {/* SIDEBAR */}
            <aside className="profile-side-nav">
              <div className="profile-nav-list">
                {["My Profile", "Settings", "Log Out"].map((item) => (
                  <button
                    key={item}
                    className={`profile-nav-item ${active === item ? "active" : ""}`}
                    onClick={() => setActive(item)}
                  >
                    {/* Adding basic icons based on item name */}
                    <span className="nav-icon">
                        {item === "My Profile" && "👤"}
                        {item === "Settings" && "⚙️"}
                        {item === "Log Out" && "↪"}
                    </span>
                    {item}
                  </button>
                ))}
              </div>
            </aside>

            {/* CONTENT AREA */}
            <div className="profile-content-card">
              
              {/* Show only when "Settings" is active */}
              {active === "Settings" && (
                <section className="profile-account-settings">
                  <h2 className="profile-form-title">Account Settings</h2>
                  <hr className="profile-divider" />

                  <h3 className="profile-field-label">Change Password</h3>

                  <div className="profile-form-group">
                    <label>Current Password :</label>
                    <input type="password" />
                  </div>

                  <div className="profile-form-group">
                    <label>New Password :</label>
                    <input type="password" />
                  </div>

                  <button className="profile-upd-pass" onClick={handleUpdate}>
                    Update Password
                  </button>

                  <div className="profile-language-section">
                    <h3 className="profile-field-label">Language</h3>
                    <div className="language-option">
                        <input type="radio" checked readOnly /> <span>English</span>
                    </div>
                  </div>
                </section>
              )}

              {/* Show only when "My Profile" is active */}
              {active === "My Profile" && (
                <section className="profile-profile-view">
                  <div className="profile-user-info">
                    <img src={user.image} alt="profile" className="profile-avatar" />
                    <div className="profile-details">
                      <h3 className="profile-username">{user.username}</h3>
                      <p className="profile-email">{user.email}</p>
                      <p className="profile-phone">+213XXXXXXXXX</p>
                    </div>
                  </div>
                  <div className="profile-actions">
                    <button className="btn-edit">Edit My Profile</button>
                    <button className="btn-delete">Log Out  </button>
                  </div>
                </section>
              )}

            </div>
          </div>

          {/* ORDERS (Always visible or wrap it too if preferred) */}
          <section className="profile-orders-section">
            
              <h2 className="heading">My Orders</h2>      
            <div className="profile-orders-container">
              {orders.map((order) => (
                <UserOrder key={order.id} order={order} />
              ))}
            </div>
          </section>
  <Delivery></Delivery>
</main>
     

    </div>
  );
}

