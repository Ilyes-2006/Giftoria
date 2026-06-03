import './Footer.css';
import { Link, NavLink } from 'react-router-dom';

function Footer() {
    return (
<nav>
    <hr id="hr"></hr>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet"></link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></link>
    <footer className="footer">
      
            <div className="footer-left">
                <div className="footer-logo">
                    <img src="../assets/gift.png" alt="Gift Icon" className="icon" />
                    <img src="../assets/giftoria-logo-text.png" alt="Giftoria" className="giftoria" />
                </div>
                <div className="social-links">
                    <a href="#" className="social-link" aria-label="Facebook">
                        <img src="../assets/facebook-icon.png" alt="Facebook" />
                    </a>
                    <a href="#" className="social-link" aria-label="Instagram">
                        <img src="../assets/instagram-icon.png" alt="Instagram" />
                    </a>
                    <a href="#" className="social-link" aria-label="Twitter">
                        <img src="../assets/twitter-icon.png" alt="Twitter" />
                    </a>
                </div>
            </div>
            <div className="footer-right">
                <div className="above">

                    <div className="quick-links">
                        <h3>Quick Links</h3>
                        <Link to="/"> 
                            <a>Home</a>
                        </Link>
                        <Link to="/AbouUs">
                            <a href="#about">About Us</a>
                        </Link>
                        <Link to="/Faq">
                            <a href="#faq">FAQ</a>
                        </Link>
                    </div>
                    <div className="quick-links" >
                        <NavLink to="/ContactUs">
                            <h3 id='contact'>Contact Us</h3>
                        </NavLink>
                        <p><i className="fas fa-map-marker-alt"></i> Amizour, Béjaïa, Algérie</p>
                        <p><i className="fas fa-envelope"></i> contact@giftoria.com</p>
                        <p><i className ="fas fa-phone"></i> +213 X XX XX XX XX</p>
                        <p><i className="fab fa-whatsapp"></i> +213 X XX XX XX XX</p>
            
                    </div>
                </div>
                <div className="below">
                    <hr id="divider" />
                    <div className="footer-bottom">
                    © 2026 Giftoria. All Rights Reserved
                    </div>
                </div>
            </div>
        
    </footer>
</nav>
    )
        
}

export default Footer;
