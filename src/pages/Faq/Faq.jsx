import "./Faq.css";
import PageHero from "../../components/UI/PageHero/PageHero";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function FAQ () {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Delivery', 'Payment', 'Orders'];
  
  const faqData = [
    {
      question: "What payment methods do you accept ?",
      answer: "We currently offer cash on delivery across Algeria",
      category: "Payment"
    },
    {
      question: "What payment methods do you accept ?",
      answer: "We currently offer cash on delivery across Algeria",
      category: "Payment"
    },
    {
      question: "What payment methods do you accept ?",
      answer: "We currently offer cash on delivery across Algeria",
      category: "Payment"
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
        <PageHero title={"Frequently Asked Questions"} subtitle={"Find answers to the most common questions about orders, delivery and payment" } hideDivider={true} />

        {/* Search Bar */}
        <div className="search-wrapper">
            <input type="text" placeholder="Search for a question..." className="faq-search-input" />
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
                    onClick={() => setActiveCategory(cat)}
                >
                    {cat}
                </button>
                ))}
            </div>
        </div>


      {/* Accordion List */}
      <div className="accordion-list">
        {faqData.map((item, index) => (
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
        ))}
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

