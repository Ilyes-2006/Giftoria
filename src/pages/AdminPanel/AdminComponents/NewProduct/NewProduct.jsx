import React, { useState } from 'react';
import './NewProduct.css';

function NewProduct({ onAddProduct, categories = [] }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const options = categories.length > 0 ? categories : [
    "Birthday", "Graduation", "Marriage", "Anniversary", 
    "Corporate Event", "Baby Shower", "Engagement", 
    "Holiday Party", "Workshop", "Seminar", "All Events"
  ];

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || price === "" || !selectedCategory) {
      setMessage({ text: "Please fill in all fields (Name, Price, Category)", type: "error" });
      return;
    }
    if (Number(price) < 0 || (quantity !== "" && Number(quantity) < 0)) {
      setMessage({ text: "Price and Quantity cannot be negative!", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      if (onAddProduct) {
        await onAddProduct({
          name,
          price: Number(price),
          category: selectedCategory,
          quantity: quantity ? Number(quantity) : 0,
          image: image || '/assets/default-product.jpg',
          description: description
        });
        setMessage({ text: `Product "${name}" created successfully!`, type: "success" });
        // Reset form
        setName("");
        setPrice("");
        setQuantity("");
        setImage("");
        setSelectedCategory("");
        setDescription("");
      } else {
        setMessage({ text: "Add product function is not configured", type: "error" });
      }
    } catch (error) {
      setMessage({ text: error.message || "Failed to create product", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        
        <input 
          type="text" 
          placeholder="Product Name" 
          className="form-input" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <hr className="input-divider" />

        <input 
          type="number" 
          step="0.01"
          min="0"
          placeholder="Price (DZD)" 
          className="form-input" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <hr className="input-divider" />

        <input 
          type="number" 
          min="0"
          placeholder="Quantity" 
          className="form-input" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <hr className="input-divider" />

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

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows={3}
        />
        <hr className="input-divider" />

        <div className="form-group-row" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          {image && (
            <img 
              src={image} 
              alt="Preview" 
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
              onError={(e) => e.target.src = '/assets/default-product.jpg'}
            />
          )}
          <input 
            type="url"
            placeholder="Product Image URL (e.g. https://example.com/image.jpg)"
            className="form-input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <hr className="input-divider" />
        
        {message.text && (
          <div className={`form-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
