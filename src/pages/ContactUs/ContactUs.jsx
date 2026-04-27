import "./ContactUs.css";   
import PageHero from "../../components/UI/PageHero/PageHero";
export default function ContactUs (){

    return(
  

    <div class="contactUs-page">
        <PageHero title={'Contact Us'} subtitle={'W^ed love to hear from you. Get in touch with us'}></PageHero>

        <div class="contactUs-main">
            <div class="contactUs-card">
                <div class="contactUs-input">
                    <label>Full Name</label>
                    <input type="text"/>
                </div>
                <div class="contactUs-input">
                    <label>Email</label>
                    <input type="email" name="email"/>
                </div>
                <div class="contactUs-input">
                    <label>Subject</label>
                    <input type="text" name="subject"/>
                </div>
                <div class="contactUs-input">
                    <label>Message</label>
                    <textarea  name="contactUs-Message" id="contactUs-Message" placeholder="Write your message..."/>
                </div>
                <div class="contactUs-form">
                    <button class="contactUs-send-message-btn">Send Message</button>
                </div>
            </div>

            <div class="contactUs-card info-sidebar">
                <div class="contactUs-info">
                    <div className="contactUs-info-title"> 
                        <i class="fas fa-envelope"></i> 
                        <h4>Email</h4>
                    </div>
                    <p>contact@giftoria.com</p>             
                </div>
                <hr/>
                <div class="contactUs-info">
                    <div className="contactUs-info-title">
                        <i class="fas fa-phone-alt"></i>
                        <h4>Phone</h4>
                    </div>                        
                    <p>+213XXXXXXXXX</p>
                </div>
                <hr/>
                <div className="contactUs-info">
                    <div className="contactUs-info-title">
                        <i class="fas fa-map-marker-alt"></i>
                        <h4>Location</h4> 
                    </div>                   
                    <p>Amizour - Bejaia</p>           
                </div>
                <hr/>
                <div class="contactUs-workhrs">
                    <h4>Working Hours</h4>
                    <p>Sunday - Thursday : 8AM - 9PM</p>
                    <p>Friday - Sunday : Closed</p>
                </div>
            </div>
        </div>
    </div>


          
    )
}  

    




