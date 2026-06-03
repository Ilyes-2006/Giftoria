import React, { useState } from 'react';
import './NewProduct.css';

function NewProduct({ categories = [] }) {
  const [fileName, setFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Default options if none are passed as props
  const options = categories.length > 0 ? categories : [
    "Birthday", "Graduation", "Marriage", "Anniversary", 
    "Corporate Event", "Baby Shower", "Engagement", 
    "Holiday Party", "Workshop", "Seminar", "All Events"
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="form-container">
      <form className="add-product-form" onSubmit={(e) => e.preventDefault()}>
        
        <input type="text" placeholder="Product Name" className="form-input" />
        <hr className="input-divider" />

        <input type="text" placeholder="Price" className="form-input" />
        <hr className="input-divider" />

        {/* Custom Scrollable Dropdown */}
        <div className="custom-select-container">
          <div 
            className={`select-trigger ${!selectedCategory ? 'placeholder' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedCategory || "Select Category"}
          </div>
          
          {isOpen && (
            <div className="options-dropdown">
              {options.map((option, index) => (
                <div 
                  key={index} 
                  className="option-item" 
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <hr className="input-divider" />

        <div className="file-input-wrapper">
          <label htmlFor="file-upload" className="file-label">
            {fileName ? fileName : "Upload Product Image"}
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden-file-input"
          />
        </div>
        <hr className="input-divider" />
        
        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default NewProduct;