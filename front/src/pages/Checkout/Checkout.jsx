import React, { useState } from "react"; // Combined imports
import "./Checkout.css";
import { Link,useLocation } from "react-router-dom";
import PageHero from '../../components/UI/PageHero/PageHero';
import Delivery from '../../components/UI/Delivery/Delivery';
import OrderSummary from "../../components/UI/OrderSummary/OrderSummary";


export default function Checkout() {
  const location = useLocation();
  const receivedItems = location.state?.cartitems || []; 

  // 1. Move the data INSIDE the component
  const wilayas = [
    "01 Adrar", "02 Chlef", "03 Laghouat", "04 Oum El Bouaghi", "05 Batna", "06 Béjaïa", "07 Biskra", "08 Béchar", "09 Blida", "10 Bouïra", 
    "11 Tamanrasset", "12 Tébessa", "13 Tlemcen", "14 Tiaret", "15 Tizi Ouzou", "16 Alger", "17 Djelfa", "18 Jijel", "19 Sétif", "20 Saïda", 
    "21 Skikda", "22 Sidi Bel Abbès", "23 Annaba", "24 Guelma", "25 Constantine", "26 Médéa", "27 Mostaganem", "28 M'Sila", "29 Mascara", "30 Ouargla", 
    "31 Oran", "32 El Bayadh", "33 Illizi", "34 Bordj Bou Arréridj", "35 Boumerdès", "36 El Tarf", "37 Tindouf", "38 Tissemsilt", "39 El Oued", "40 Khenchela", 
    "41 Souk Ahras", "42 Tipaza", "43 Mila", "44 Aïn Defla", "45 Naâma", "46 Aïn Témouchent", "47 Ghardaïa", "48 Relizane", "49 Timimoun", "50 Bordj Badji Mokhtar", 
    "51 Ouled Djellal", "52 Béni Abbès", "53 In Salah", "54 In Guezzam", "55 Touggourt", "56 Djanet", "57 El M'Ghair", "58 El Meniaa", "59 Aflou", "60 Barika", 
    "61 Ksar Chellala", "62 Messaad", "63 Aïn Oussera", "64 Boussaâda", "65 El Abiodh Sidi Cheikh", "66 El Kantara", "67 Bir El Ater", "68 Ksar El Boukhari", "69 El Aricha"
  ];

  const baladiyasData = {
    "06 Béjaïa": ["Béjaïa", "Amizour", "Akbou", "El Kseur"],
    "16 Alger": ["Sidi M'Hamed", "Bab El Oued", "Dely Ibrahim", "Zeralda"],
  };

  // 2. Move the state INSIDE the component
  const [selectedWilaya, setSelectedWilaya] = useState("16 Alger");

  return (
    <div className="checkout-page">
      <PageHero title="Checkout" subtitle="Fill in your details to complete your purchase" />

      <section className="checkout-main">
        <section className="delivery-info-section">
          <h1 className="checkout-title">Delivery information</h1>
          <hr className="checkout-hr" />

          <div className="input-group">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" placeholder="John Doe" />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="0555 00 00 00" />
          </div>

          {/* Wilaya Selection */}
          <div className="input-group">
            <label htmlFor="wilaya">Wilaya</label>
            <select 
              id="wilaya" 
              className="checkout-select"
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
            >
              <option value="">Select Wilaya</option>
              {wilayas.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          {/* Baladiya Selection */}
          <div className="input-group">
            <label htmlFor="baladiya">Baladiya</label>
            <select id="baladiya" className="checkout-select" disabled={!selectedWilaya} >
              <option value="">Select Baladiya</option>
              {selectedWilaya && baladiyasData[selectedWilaya]?.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <hr className="checkout-hr" />

          <div className="input-group">
            <p className="method-title">Delivery Method</p>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="deliveryMethod" value="home" defaultChecked />
                Home Delivery
              </label>
              <label className="radio-option">
                <input type="radio" name="deliveryMethod" value="office"  />
                Delivery to Office
              </label>
            </div>
          </div>

          <hr className="checkout-hr" />

          <div className="input-group">
            <p className="method-title">Payment Method</p>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="paymentMethod" value="On Delivery" defaultChecked />
                Cash on Delivery
              </label>
              <label className="radio-option">
                <input type="radio" name="paymentMethod" value="baridimob" />
                Pay by Baridimob
              </label>
            </div>
          </div>
        </section>

        <section className="summary-section">
        <OrderSummary  cartitems={receivedItems} variant="checkout"/>
        </section>
      </section>

      <Delivery />
    </div>
  );
}