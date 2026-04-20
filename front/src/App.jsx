import { BrowserRouter as Router, Routes, Route, useLocation,useNavigate   } from 'react-router-dom';
import { useState,useEffect } from 'react';
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

import Admin from './pages/AdminPanel/Admin/Admin';
import './styles/global.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
 
  const [isLoggedIn, setisLoggedIn] = useState(true);
  
  const user = isLoggedIn ? { name: "Ilyes",role: "user" } : null;
  
  function RequireAdmin({ user, children }) {
    if (!user) return <h1>Not logged in</h1>;
    if (user.role !== "admin") {
      return <h1>Access denied</h1>;
    }
    return children;
}
  

useEffect(() => {
  if (user?.role === "admin" && location.pathname === "/") {
    navigate("/admin");
  }
}, [user, location.pathname]);
  



  const hideNavbarAndFooter =
  location.pathname.toLowerCase().startsWith("/admin") ||
  location.pathname === "/Inscription" ||
  location.pathname === "/Connexion";
  
  const productsData = [
    { id: 1, name: 'Coffret de Chocolats',quantity: 10 , price: 29.99, image: '/assets/product-images/product-image1.jpg' },
    { id: 2, name: 'Bouquet de Fleurs',quantity: 7, price: 49.99, image: '/assets/product-images/product-image2.jpg' },
    { id: 3, name: 'Parfum de Luxe',quantity: 4, price: 79.99, image: '/assets/product-images/product-image3.jpg' },
    { id: 4, name: 'Montre Élégante',quantity: 14, price: 199.99, image: '/assets/product-images/product-image4.jpg' },
    { id: 5, name: 'Coffret de Vin',quantity: 5, price: 59.99, image: '/assets/product-images/product-image1.jpg' },
    { id: 6, name: 'Bijoux Fantaisie',quantity: 3, price: 39.99, image: '/assets/product-images/product-image2.jpg' },
  ]; 
  const usersData = [
    { name: 'John Doe', email: 'john@email.com' },
    { name: 'Sarah K', email: 'sarah@email.com' },
    { name: 'Sarah K', email: 'sarah@email.com' }

  ];
const OrdersData = [
  {
    id: 1,
    productName: "Gold Earrings",
    quantity: 2,
    customerName: "John Doe",
    wilaya: "Tizi-Ouzou",
    baladiya: "Azazga",
    deliveryType: "home",
    homeAddress: "Street 05, House 12, near the Mosque",
    phoneNumber: "0555 12 34 56", 
    totalPrice: "9000"
  },
  {
    id: 2,
    productName: "Silver Necklace",
    quantity: 1,
    customerName: "Amine Rahmani",
    wilaya: "Algiers",
    baladiya: "Hydra",
    deliveryType: "office",
    homeAddress: "", 
    phoneNumber: "0555 12 34 56", 
    totalPrice: "3200"
  },
  {
    id: 2,
    productName: "Silver Necklace",
    quantity: 1,
    customerName: "Amine Rahmani",
    wilaya: "Algiers",
    baladiya: "Hydra",
    deliveryType: "office",
    homeAddress: "", // Empty because it's office delivery
    totalPrice: "3200"
  }
];
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
            <Route path="/Admin" element={ <RequireAdmin user={user}>
                                            <Admin products={productsData} users={usersData} orders={OrdersData}/>
                                          </RequireAdmin>}>
            </Route>
            
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
