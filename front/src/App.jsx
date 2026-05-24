import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import Profile from './pages/Profile/Profile';
import './styles/global.css';

import { fetchCurrentUser, fetchOrders, fetchProducts, fetchUsers, createProduct, updateProduct, deleteProduct, deleteUser } from './services/api';
import { CartProvider } from './hooks/useCart';

// Superuser email — must match the backend constant
const SUPERUSER_EMAIL = 'admin@giftoria.com';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load User from token
  useEffect(() => {
    const loadSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await fetchCurrentUser(token);
          setUser(data.user);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Invalid token or session expired");
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadSession();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersData(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleDeleteOrder = (orderId) => {
    setOrdersData(prev => prev.filter(o => o.id !== orderId));
  };

  // Admin routing check
  useEffect(() => {
    if (!loading && user?.email === SUPERUSER_EMAIL && location.pathname === "/") {
      navigate("/Admin");
    }
  }, [user, location.pathname, loading, navigate]);

  // Fetch orders for logged-in user
  useEffect(() => {
    if (user) {
      fetchOrders()
        .then(data => {
          if (user.isSuperuser) {
            setOrdersData(data);
          } else {
            const filtered = data.filter(order => 
              (order.customerName && order.customerName.toLowerCase() === user.username.toLowerCase())
            );
            setOrdersData(filtered);
          }
        })
        .catch(console.error);
    } else {
      setOrdersData([]);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.isSuperuser) {
      fetchProducts().then(setProducts).catch(console.error);
      fetchUsers()
        .then(fetchedUsers => {
          const regularUsers = fetchedUsers.filter(u => !u.isSuperuser);
          setUsers(regularUsers);
        })
        .catch(console.error);
    } else {
      setProducts([]);
      setUsers([]);
    }
  }, [user]);

  const handleAddProduct = async (productData) => {
    try {
      const data = await createProduct(productData);
      setProducts(prev => [...prev, data.product]);
      return data.product;
    } catch (error) {
      console.error("Failed to add product:", error);
      throw error;
    }
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const data = await updateProduct(productId, updatedData);
      setProducts(prev => prev.map(p => p.id === productId ? data.product : p));
      return data.product;
    } catch (error) {
      console.error("Failed to update product:", error);
      throw error;
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
      throw error;
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  };

  function RequireAdmin({ user, children }) {
    if (loading) return <h1>Loading...</h1>;
    if (!user) return <h1>Not logged in</h1>;
    if (!user.isSuperuser) {
      return <h1>Access denied</h1>;
    }
    return children;
  }

  const hideNavbarAndFooter =
    location.pathname.toLowerCase().startsWith("/admin") ||
    location.pathname === "/Inscription" ||
    location.pathname === "/Connexion";

  return (
    <div className="app-container">
      {!hideNavbarAndFooter && <Navbar isLoggedIn={isLoggedIn} />}

      <main className="main-content">
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/Shop" element={<Shop user={user} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart user={user} loading={loading} />} />
          <Route path="/checkout" element={<Checkout user={user} />} />
          <Route path="/ContactUs" element={<ContactUs user={user} />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/Connexion" element={<Connexion setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/Profile" element={isLoggedIn ? <Profile orders={ordersData} user={user} handleLogout={handleLogout} /> : <Home />} />
          <Route path="*" element={<Home user={user} />} />
          <Route path="/Admin" element={<RequireAdmin user={user}>
            <Admin
              products={products}
              users={users}
              orders={ordersData}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onDeleteOrder={handleDeleteOrder}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onDeleteUser={handleDeleteUser}
            />
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
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}
export default App;
