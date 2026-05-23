import "./Faq.css";
import PageHero from "../../components/UI/PageHero/PageHero";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function FAQ () {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Delivery', 'Payment', 'Orders', 'Returns', 'Products', 'Account'];
  
  const faqData = [
    // ── Payment ──
    {
      question: "What payment methods do you accept?",
      answer: "We currently accept Cash on Delivery (COD) across all 58 wilayas of Algeria. You only pay when your parcel is delivered to your door or at our designated collection office.",
      category: "Payment"
    },
    {
      question: "Can I pay online with Edahabia or CIB cards?",
      answer: "Currently, we only support Cash on Delivery to keep the shopping experience simple and secure. We are actively working to integrate card payments in our next major update!",
      category: "Payment"
    },
    {
      question: "Is there any extra fee for Cash on Delivery?",
      answer: "No. There are absolutely no additional fees for choosing Cash on Delivery. The price you see at checkout is exactly what you pay.",
      category: "Payment"
    },
    // ── Delivery ──
    {
      question: "How long does delivery take?",
      answer: "Delivery takes 2 to 5 business days depending on your wilaya. Large cities like Algiers, Oran, and Constantine usually receive packages within 24 to 48 hours.",
      category: "Delivery"
    },
    {
      question: "Can I receive my order at my office?",
      answer: "Yes, you can choose either home delivery or office delivery during the checkout process. Simply provide your office details and address.",
      category: "Delivery"
    },
    {
      question: "How much does delivery cost?",
      answer: "Delivery fees vary by wilaya and delivery type (home vs. office). The exact cost is calculated and displayed during checkout before you confirm your order.",
      category: "Delivery"
    },
    {
      question: "Do you deliver to all wilayas in Algeria?",
      answer: "Yes! We deliver to all 58 wilayas of Algeria through our trusted delivery partners. Remote areas may experience slightly longer delivery times.",
      category: "Delivery"
    },
    // ── Orders ──
    {
      question: "How can I track my order status?",
      answer: "You can track the state of your orders in real-time by going to your Profile page and viewing the 'My Orders' section. Statuses range from Pending, Confirmed, Shipped, to Delivered.",
      category: "Orders"
    },
    {
      question: "Can I cancel my order after placing it?",
      answer: "Orders can be cancelled at any time as long as their status is 'Pending'. Once the status updates to 'Shipped', the package has been handed over to our delivery partners and cannot be recalled.",
      category: "Orders"
    },
    {
      question: "Can I modify my order after placing it?",
      answer: "Order modifications (changing items, quantities, or address) are only possible while the order status is still 'Pending'. Please contact us immediately via the Contact Us page or by phone if you need to make a change.",
      category: "Orders"
    },
    {
      question: "I placed an order but didn't receive a confirmation — what should I do?",
      answer: "First, check your Profile page under 'My Orders' to confirm the order was registered. If it appears there, your order is confirmed. If not, please contact our support team and we'll assist you right away.",
      category: "Orders"
    },
    // ── Returns ──
    {
      question: "Can I return a product if I'm not satisfied?",
      answer: "Yes, we accept returns within 7 days of delivery, provided the item is unused, in its original packaging, and accompanied by proof of purchase. Please contact us to initiate a return.",
      category: "Returns"
    },
    {
      question: "What if I receive a damaged or wrong item?",
      answer: "We sincerely apologize for such inconveniences. Please take a photo of the damaged or wrong item and contact our support team within 48 hours of receiving your order. We will arrange a replacement or full refund.",
      category: "Returns"
    },
    {
      question: "How long does a refund take to process?",
      answer: "Since we use Cash on Delivery, refunds are processed manually. Once your return is validated, we will coordinate with you directly to reimburse you within 3 to 7 business days.",
      category: "Returns"
    },
    // ── Products ──
    {
      question: "Are your gift products available for customization?",
      answer: "Many of our products support personalization such as custom messages, name engraving, or personalized packaging. Look for the 'Customizable' tag on product pages or contact us for special requests.",
      category: "Products"
    },
    {
      question: "Are the product photos accurate?",
      answer: "We strive to show products as accurately as possible. Colors may vary slightly due to screen settings, but the product quality, size, and design are exactly as displayed.",
      category: "Products"
    },
    {
      question: "What should I do if a product is out of stock?",
      answer: "If a product shows as out of stock, you can contact us via the Contact Us page to request a restock notification. We regularly update our inventory and will reach out as soon as it becomes available.",
      category: "Products"
    },
    // ── Account ──
    {
      question: "Do I need an account to place an order?",
      answer: "Yes, an account is required to place an order on Giftoria. This allows you to track your orders, save your delivery addresses, and enjoy a faster checkout experience.",
      category: "Account"
    },
    {
      question: "How do I update my phone number or profile information?",
      answer: "Go to your Profile page and click 'Edit My Profile'. You can update your username, phone number, and profile photo. Changes are saved instantly.",
      category: "Account"
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer: "On the Sign In page, click 'Forgot password?' and follow the instructions sent to your email. If you continue to have trouble, contact our support team for assistance.",
      category: "Account"
    },
   ];


  const filteredFaq = faqData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
        <PageHero title={"Frequently Asked Questions"} subtitle={"Find answers to the most common questions about orders, delivery and payment"} hideDivider={true} />

        {/* Search Bar */}
        <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="Search for a question..." 
              className="faq-search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D4263" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            </button>
        </div>

      {/* Categories */}
        <div className="category-line">
            <hr id="hr-bg"/>
            <div className="category-tabs">
                
                {categories.map((cat) => (
                <button 
                    key={cat}
                    className={`tab ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat);
                      setActiveIndex(null); // collapse active accordion on category change
                    }}
                >
                    {cat}
                </button>
                ))}
            </div>
        </div>


      {/* Accordion List */}
      <div className="accordion-list">
        {filteredFaq.length === 0 ? (
          <div className="faq-no-results" style={{ textAlign: "center", padding: "30px 15px", color: "#6b7280", fontStyle: "italic", fontSize: "1.1rem" }}>
            No questions found matching your search. Try adjusting your query or category filters!
          </div>
        ) : (
          filteredFaq.map((item, index) => (
            <div key={index} className={`accordion-item ${activeIndex === index ? 'open' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                <span>{item.question}</span>
                <span className={`arrow ${activeIndex === index ? 'up' : 'down'}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
              {activeIndex === index && (
                <div className="accordion-body">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <hr className="divider" />

      {/* Footer Support Box */}
      <div className="faq-still">
        <h2>Still Have Questions ?</h2>
        <p>Contact our support team and we’ll help you</p>
        <Link to={'/ContactUs'} >
            <button className="faq-contact-btn">Contact us</button>
        </Link>
        
      </div>
    </div>
  );
}

