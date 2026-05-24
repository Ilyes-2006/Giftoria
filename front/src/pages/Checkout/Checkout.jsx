  import React, { useState, useRef, useEffect } from "react";
  import "./Checkout.css";
  import { Link,useLocation, useNavigate } from "react-router-dom";
  import PageHero from '../../components/UI/PageHero/PageHero';
  import Delivery from '../../components/UI/Delivery/Delivery';
  import OrderSummary from "../../components/UI/OrderSummary/OrderSummary";
  import { useCart } from '../../hooks/useCart';
  import { createOrder } from '../../services/api';


  export default function Checkout({ user }) {
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

    // State
    const [selectedWilaya, setSelectedWilaya] = useState("");
    const [selectedBaladiya, setSelectedBaladiya] = useState("");
    const [wilayaOpen, setWilayaOpen] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('home');
    const [paymentMethod, setPaymentMethod] = useState('On Delivery');
    const [formError, setFormError] = useState("");
    const wilayaRef = useRef(null);
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const shippingFee = deliveryMethod === 'home' ? 500 : 0;

    const handlePlaceOrder = async () => {
      if (!selectedWilaya || !selectedBaladiya) {
        setFormError("Please select both your Wilaya and Baladiya to proceed with your order.");
        return;
      }
      setFormError("");
      
      const subtotal = receivedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const totalPrice = subtotal + shippingFee;

      const orderData = {
        customerName: user?.username || "Guest",
        phoneNumber: user?.phone || "",
        wilaya: selectedWilaya,
        baladiya: selectedBaladiya,
        deliveryType: deliveryMethod,
        paymentMethod: paymentMethod,
        totalPrice,
        products: receivedItems.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image })),
        status: "Pending"
      };

      try {
        await createOrder(orderData);
        clearCart();
        navigate("/Profile", { state: { message: "Order placed successfully" } });
      } catch (error) {
        alert("Failed to place order: " + error.message);
      }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (wilayaRef.current && !wilayaRef.current.contains(e.target)) {
          setWilayaOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="checkout-page">
        <PageHero title="Checkout" subtitle="Fill in your details to complete your purchase" />

        <section className="checkout-main">
          <section className="delivery-info-section">
            <h1 className="checkout-title">Delivery information</h1>
            <hr className="checkout-hr" />

            {formError && (
              <div className="checkout-error-message">
                <span className="error-icon">⚠️</span>
                {formError}
              </div>
            )}

            {/* Wilaya Selection */}
            <div className="input-group" ref={wilayaRef}>
              <label>Wilaya</label>
              <div
                className={`custom-select-trigger ${wilayaOpen ? 'open' : ''}`}
                onClick={() => setWilayaOpen((o) => !o)}
              >
                <span>{selectedWilaya || 'Select Wilaya'}</span>
                <span className="select-chevron">{wilayaOpen ? '▲' : '▼'}</span>
              </div>
              {wilayaOpen && (
                <div className="custom-select-dropdown">
                  {wilayas.map((w) => (
                    <div
                      key={w}
                      className={`custom-select-option ${selectedWilaya === w ? 'selected' : ''}`}
                      onClick={() => { setSelectedWilaya(w); setWilayaOpen(false); }}
                    >
                      {w}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Baladiya Selection */}
            <div className="input-group">
              <label htmlFor="baladiya">Baladiya</label>
              <select 
                id="baladiya" 
                className="checkout-select" 
                disabled={!selectedWilaya}
                value={selectedBaladiya}
                onChange={(e) => setSelectedBaladiya(e.target.value)}
              >
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
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="home"
                    checked={deliveryMethod === 'home'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  Home Delivery
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="office"
                    checked={deliveryMethod === 'office'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  Delivery to Office
                </label>
              </div>
            </div>

            <hr className="checkout-hr" />

            <div className="input-group">
              <p className="method-title">Payment Method</p>
              <div className="radio-group">
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="On Delivery" 
                    checked={paymentMethod === 'On Delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="baridimob" 
                    checked={paymentMethod === 'baridimob'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Pay by Baridimob
                </label>
              </div>
            </div>
          </section>

          <section className="summary-section">
          <OrderSummary cartitems={receivedItems} variant="checkout" shippingFee={shippingFee} onPlaceOrder={handlePlaceOrder} />
          </section>
        </section>

        <Delivery />
      </div>
    );
  }
