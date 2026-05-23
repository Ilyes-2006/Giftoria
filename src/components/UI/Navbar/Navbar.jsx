import { useState,useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Link } from 'react-router-dom';


function Navbar({isLoggedIn} ) {

   const [showMoreDropdown, setShowMoreDropdown] = useState(false);
   const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false); // Scrolling down
    } else {
      setIsVisible(true);  // Scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const closeDropdown = () => setShowMoreDropdown(false);
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

    
    const [searchPlaceholder, setSearchPlaceholder] = useState('Search gifts');
    const location = useLocation();

    return (
        <header className="header" style={{ top: isVisible ? '0' : '-100px' }}>
            <div className="logo">
                <NavLink to="/">
                    <img src="/assets/gift.png" alt="Gift icon" className="gift-icon" />
                </NavLink>
                <img src="/assets/giftoria-logo-text.png" alt="Giftoria logo" className="logo-image" />
            </div>
            <div className="search-bar">
                <div className="search-field">
                    
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="search-input"
                        onFocus={() => setSearchPlaceholder('')}
                        onBlur={() => setSearchPlaceholder('Search gifts')}
                        autoComplete="off"
                    />
                    <img src="https://img.icons8.com/ios-filled/24/1F2A44/search.png" alt="Search icon" className="search-icon" />
                </div>
            </div>
            <nav className="nav">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Home
                </NavLink>
                <NavLink to="/Shop" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Shop
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Cart
                </NavLink>
                <div className="navbar-more-menu-container">
                    <button 
                        type="button" 
                        className="navbar-more-dots-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMoreDropdown(!showMoreDropdown);
                        }}
                        aria-label="More options"
                    >
                        ⋮
                    </button>
                    {showMoreDropdown && (
                        <div className="navbar-more-dropdown" onClick={(e) => e.stopPropagation()}>
                            <Link to="/ContactUs" className="navbar-dropdown-item" onClick={() => setShowMoreDropdown(false)}>
                                Contact us
                            </Link>
                            <Link to="/Faq" className="navbar-dropdown-item" onClick={() => setShowMoreDropdown(false)}>
                                FAQ
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
            {isLoggedIn ? (
                <Link to="/Profile">
                    <button
                        type="button"
                        className={`btn log-in profile-button${location.pathname === '/Profile' ? ' active-profile' : ''}`}
                    >
                        Profile
                    </button>
                </Link>
            ) : (
                <div className="auth-buttons">
                    <Link to="/Connexion" className="btn sign-in">
                        <button className="btn sign-in">Sign In</button>
                    </Link>   
                    <Link to="/Inscription" className="btn log-in">
                        <button className="btn log-in">Log In</button>
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Navbar;