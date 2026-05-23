import { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from "../../services/api";
import "./Connexion.css";

export default function Connexion({ setUser, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const redirectMessage = location.state?.message;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsLoggedIn(true);
      
      if (data.user.isSuperuser) {
        navigate("/Admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError("Unable to connect to the server. Please check if the backend is running.");
      } else {
        setError(err.message || "Failed to login. Check your credentials.");
      }
    }
  };

  return (
    <div className="connexion-body">
      <div className="connexion-container">
        <div className="photo">
          <img src="/assets/4016ad657480b39d31eb71e7558ec2e46cbdc27b.png" alt="cadeau" />
          <div>
            <img src="/assets/2c9054eeffad7c25c8055ba34f0f8728dad1c020.png" alt="gift icon" />
            <h2>🎁 Giftoria</h2>
          </div>
        </div>

        <div className="connexion-main-content">
          <h1>CONNEXION</h1>

          {redirectMessage && <div style={{ color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontWeight: '500', textAlign: 'center' }}>{redirectMessage}</div>}
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <form id="loginForm" onSubmit={handleLogin}>
            <label className="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Entrer votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="form-label">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn-primary" type="submit">Connexion</button>
          </form>

          <div className="links">
            <p>Créer un compte ? 
               <Link to="/Inscription">
                   <span>Inscription</span>
               </Link>
            </p>
            <a href="#">Mot de passe oublié</a>
          </div>
        </div>
      </div>
    </div>
  );
}