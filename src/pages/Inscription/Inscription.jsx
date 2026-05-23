import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../../services/api";
import './inscription.css';

export default function Inscription() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(username, email, password);
      
      const pending = JSON.parse(localStorage.getItem("pendingAction"));

      if (pending?.type === "addToCart") {
        console.log("Continue:", pending.productId);
        localStorage.removeItem("pendingAction");
        navigate("/cart");
      } else {
        navigate("/Connexion"); // Redirect to login after successful registration
      }
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError("Unable to connect to the server. Please check if the backend is running.");
      } else {
        setError(err.message || "Failed to register. Please try again.");
      }
    }
  }

  return (
    <div className="inscription-body">
      <div className="inscription-container">
        
        <div className="form-box">
          <h2>INSCRIPTION</h2>

          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="input-box">
                <input 
                  type="text" 
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <i className="fa fa-user"></i>
            </div>

            <div className="input-box">
                <input 
                  type="email" 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="fa fa-envelope"></i>
            </div>

            <div className="input-box">
                <input 
                  type="password" 
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="fa fa-lock"></i>
            </div>

            <button type="submit" className="inscription-btn">Inscription</button>
          </form>

          <div className="login-link">
            <p>Vous avez déjà un compte ?
                <Link to="/Connexion">
                   <span>Connexion</span>
                </Link>
            </p>
          </div>
        </div>
        
        <div className="image-box">
            <img src="/assets/4016ad657480b39d31eb71e7558ec2e46cbdc27b.png" alt="Gift" />
            <div className="inscription-giftoria-logo">
                <p>🎁 Giftoria</p> 
            </div>
        </div>

      </div>
    </div>
  );
}
