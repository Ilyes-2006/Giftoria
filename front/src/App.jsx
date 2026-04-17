import { BrowserRouter as Router, Routes, Route, useLocation, } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/UI/Navbar/Navbar';
import Footer from './components/UI/Footer/Footer';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Inscription from './pages/Inscription/Inscription';
import Connexion from './pages/Connexion/Connexion';
import Checkout from './pages/Checkout/Checkout';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import ContactUs from './pages/ContactUs/ContactUs';
import Faq from './pages/Faq/Faq';
import './styles/global.css';

function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  
  const user = isLoggedIn ? { name: "Ilyes" } : null;


  const hideNavbarAndFooter = ['/Inscription', '/Connexion'].includes(location.pathname);
  return (
    
      <div className="app-container">
       {!hideNavbarAndFooter && <Navbar isLoggedIn={isLoggedIn} />}
        
        <main className="main-content">
          <ScrollToTop></ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Shop" element={<Shop user={user} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/ContactUs" element={<ContactUs/>}/>
            <Route path="/Faq" element={<Faq/>}/>
            <Route path="/Inscription" element={<Inscription />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="*" element={<Home />} />
            
          </Routes>
        </main>
        {!hideNavbarAndFooter && <Footer />}
        
      </div>
    
  );
}
function App() { 
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
