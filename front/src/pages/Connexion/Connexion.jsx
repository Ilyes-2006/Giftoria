import "./Connexion.css";
import { Link } from 'react-router-dom';

export default function Connexion() {
    return (
<div className="connexion-body">   
  <div class="connexion-container">

    
    <div class="photo">
      
      <img src="/assets/4016ad657480b39d31eb71e7558ec2e46cbdc27b.png" alt="cadeau"></img>
      <div>
        <img src="/assets/2c9054eeffad7c25c8055ba34f0f8728dad1c020.png" alt="gift icon"></img>
        <h2>🎁 Giftoria</h2>
      </div>
      
    </div>

   
    <div class="connexion-main-content">
      <h1>CONNEXION</h1>

        <form id="loginForm">
            <label className="form-label">Email</label>
            <input type="email" id="email" placeholder="Entrer votre email"></input>

            <label className="form-label">Mot de passe</label>
            <input type="password" id="password" placeholder="Entrer votre mot de passe"></input>

            <button className="btn-primary" type="submit">Connexion</button>
        </form>

      <div class="links">
        <p>Créer un compte ? 
           <Link to="/Inscription">
               <p>Inscription</p>
            </Link>
        </p>
        <a href="#">Mot de passe oublié</a>
      </div>
    </div>

  </div>
  </div>
)}


  