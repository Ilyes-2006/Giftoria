import { Link ,useNavigate } from 'react-router-dom';
import './inscription.css';

export default function Inscription() {
    const navigate = useNavigate();

  function handleLogin() {
    // login success

    const pending = JSON.parse(localStorage.getItem("pendingAction"));

    if (pending?.type === "addToCart") {
      console.log("Continue:", pending.productId);
      localStorage.removeItem("pendingAction");
      navigate("/cart");
    } else {
      navigate("/");
    }
  }


    return (
<div className="inscription-body">
<div className="inscription-container">

    
    <div className="form-box">

        <h2>INSCRIPTION</h2>

        <div className  ="input-box">
            <input type="text" placeholder="Nom d'utilisateur"></input>
            <i className="fa fa-user"></i>
        </div>

        <div className="input-box">
            <input type="email" placeholder="Email"></input>
            <i className="fa fa-envelope"></i>
        </div>

        <div className="input-box">
            <input type="password" placeholder="Mot de passe"></input>
            <i className="fa fa-lock"></i>
        </div>

        <button onClick={handleLogin()} className="inscription-btn">inscription</button>

        <p className="login-link">Vous avez déjà un compte ?
            <Link to="/Connexion">
               <p>Connexion</p>
            </Link>
        </p>

    </div>


    
    <div className="image-box">
        <img src="\assets\4016ad657480b39d31eb71e7558ec2e46cbdc27b.png" alt="Gift"></img>
        <div className="inscription-giftoria-logo">
            {/* <img src="/assets/gift.png" alt="Gift icon" /> */}
            <p>🎁 Giftoria</p> 
        </div>
    </div>

</div>
</div>
)}











