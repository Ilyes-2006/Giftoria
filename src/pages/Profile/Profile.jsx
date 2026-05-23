import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";
import PageHero from "../../components/UI/PageHero/PageHero";
import Delivery from "../../components/UI/Delivery/Delivery";
import UserOrder from "../../components/UI/UserOrder/UserOrder";
import { updateProfile } from "../../services/api";

export default function Profile({ orders, user, handleLogout }) {
  const [active, setActive] = useState("My Profile");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      alert(location.state.message);
      navigate("/Profile", { replace: true, state: {} });
    }
  }, [location, navigate]);
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editEmail, setEditEmail] = useState(user.email);
  // Strip +213 or leading 0 to keep only 9 digits (5/6/7 + 8 digits)
  const normalizePhone = (raw) => {
    if (!raw) return "";
    let p = raw.replace(/[^\d]/g, ""); // digits only
    if (p.startsWith("213")) p = p.slice(3); // remove 213 country code
    if (p.startsWith("0")) p = p.slice(1);   // remove leading 0
    return p;
  };
  const [editPhone, setEditPhone] = useState(normalizePhone(user.phone));
  const [editImage, setEditImage] = useState(user.image || "");
  const [language, setLanguage] = useState("English");
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await updateProfile(token, { currentPassword, newPassword });
      setMessage({ type: "success", text: res.message });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleUpdateProfileDetails = async (e) => {
    e.preventDefault();
    
    // Algerian phone validation: 0[567]XXXXXXXX — 10 digits total stored without leading 0
    const phoneRegex = /^[567]\d{8}$/;
    if (editPhone && !phoneRegex.test(editPhone)) {
      setMessage({ type: "error", text: "Phone must be 10 digits: 0 + (5, 6 or 7) + 8 digits" });
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await updateProfile(token, { username: editUsername, email: editEmail, phone: editPhone, image: editImage });
      setMessage({ type: "success", text: res.message });
      // Update local state directly for immediate UI feedback
      user.username = editUsername;
      user.email = editEmail;
      user.phone = editPhone;
      user.image = editImage;
      setIsEditingProfile(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleNavClick = (item) => {
    if (item === "Log Out") {
      setShowLogoutConfirm(true);
    } else {
      setActive(item);
      setMessage(null);
    }
  }; 

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    if (handleLogout) handleLogout();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="page-container">
      <PageHero title="User Account" subtitle="Manage your profile" />  

      <main className="content-wrapper">
        <div className="settings-layout">
          
          {/* SIDEBAR */}
          <aside className="profile-side-nav">
            <div className="profile-nav-list">
              {["My Profile", "Settings", "Log Out"].map((item) => {
                const isLogout = item === "Log Out";
                return (
                  <button
                    key={item}
                    className={`profile-nav-item ${active === item ? "active" : ""} ${isLogout ? "logout-item" : ""}`}
                    onClick={() => handleNavClick(item)}
                  >
                    <span className="nav-icon">
                        {item === "My Profile" && "👤"}
                        {item === "Settings" && "⚙️"}
                        {item === "Log Out" && "↪"}
                    </span>
                    {item}
                  </button>
                );
              })}
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

                {message && (
                  <div className={`profile-message ${message.type}`}>
                    {message.text}
                  </div>
                )}

                <div className="profile-form-group">
                  <label>Current Password :</label>
                  <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                </div>

                <div className="profile-form-group">
                  <label>New Password :</label>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>

                <button className="profile-upd-pass" onClick={handleUpdatePassword}>
                  Update Password
                </button>

                <div className="profile-language-section">
                  <h3 className="profile-field-label">Language</h3>
                  <div className="language-options">
                    <label className="language-option">
                        <input 
                          type="radio" 
                          name="language" 
                          value="English" 
                          checked={language === "English"} 
                          onChange={() => setLanguage("English")} 
                        /> 
                        <span>English</span>
                    </label>
                    <label className="language-option">
                        <input 
                          type="radio" 
                          name="language" 
                          value="Français" 
                          checked={language === "Français"} 
                          onChange={() => setLanguage("Français")} 
                        /> 
                        <span>Français</span>
                    </label>
                  </div>
                </div>
              </section>
            )}

            {/* Show only when "My Profile" is active */}
            {active === "My Profile" && (
              <section className="profile-profile-view">
                {message && !isEditingProfile && (
                  <div className={`profile-message ${message.type}`}>
                    {message.text}
                  </div>
                )}
                
                <div className="profile-user-info">
                  <img src={user.image} alt="profile" className="profile-avatar" />
                  <div className="profile-details">
                    <h3 className="profile-username">{user.username}</h3>
                    <p className="profile-email">{user.email}</p>
                    {user.phone && (
                      <p className="profile-phone">
                        0{normalizePhone(user.phone)}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="profile-actions">
                  <button className="btn-edit-profile" onClick={() => {
                    setEditUsername(user.username);
                    setEditEmail(user.email);
                    setEditPhone(normalizePhone(user.phone));
                    setEditImage(user.image || "");
                    setIsEditingProfile(true);
                    setMessage(null);
                  }}>Eddit My Profile</button>
                  <button className="btn-delete" onClick={() => setShowLogoutConfirm(true)}>Delete my account</button>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* EDIT PROFILE MODAL */}
        {isEditingProfile && (
          <div className="logout-confirm-overlay">
            <div className="logout-confirm-panel edit-profile-panel">
              <h3>Edit Profile</h3>
              <p>Update your personal information below.</p>
              
              <div className="profile-edit-avatar-section">
                <img 
                  src={editImage || "/assets/product-images/product-image2.jpg"} 
                  alt="edit avatar" 
                  className="profile-edit-avatar-preview" 
                />
                <label htmlFor="edit-avatar-upload" className="btn-edit-avatar-upload">
                  Change Photo
                </label>
                <input 
                  type="file" 
                  id="edit-avatar-upload" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: "none" }}
                />
              </div>

              <div className="profile-edit-form">
                <div className="profile-form-group">
                  <label>Username :</label>
                  <input type="text" value={editUsername} onChange={e => setEditUsername(e.target.value)} />
                </div>
                <div className="profile-form-group">
                  <label>Phone :</label>
                  <input
                    type="text"
                    placeholder="e.g. 612345678"
                    maxLength={9}
                    value={editPhone}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      // First digit must be 5, 6, or 7
                      if (val.length > 0 && !['5','6','7'].includes(val[0])) return;
                      if (val.length <= 9) setEditPhone(val);
                    }}
                  />
                </div>
              </div>

              {message && (
                <div className={`profile-message ${message.type}`} style={{ marginTop: "15px", marginBottom: "0" }}>
                  {message.text}
                </div>
              )}

              <div className="logout-confirm-actions">
                <button className="btn-cancel" onClick={() => {
                  setIsEditingProfile(false);
                  setEditUsername(user.username);
                  setEditEmail(user.email);
                  setEditPhone(user.phone || "");
                  setEditImage(user.image || "");
                  setMessage(null);
                }}>Cancel</button>
                <button className="profile-upd-pass" onClick={handleUpdateProfileDetails}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* LOGOUT CONFIRM MODAL */}
        {showLogoutConfirm && (
          <div className="logout-confirm-overlay">
            <div className="logout-confirm-panel">
              <h3>Confirm Logout</h3>
              <p>Are you sure you want to log out?</p>
              <div className="logout-confirm-actions">
                <button className="btn-cancel" onClick={cancelLogout}>Cancel</button>
                <button className="btn-confirm-logout" onClick={confirmLogout}>Yes, Log Out</button>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS */}
        <section className="profile-orders-section">
          <div className="heading">
            <h2>My Orders</h2>
          </div>
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
