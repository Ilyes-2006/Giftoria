# Giftoria Frontend - Refactored Setup Guide

## What Changed

Your React project has been refactored into a clean, scalable architecture with the following improvements:

### Directory Structure
```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   └── ProductCard/
│       ├── ProductCard.jsx
│       └── ProductCard.css
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── ProductDetails/
│   │   ├── ProductDetails.jsx
│   │   └── ProductDetails.css
│   └── Cart/
│       ├── Cart.jsx
│       └── Cart.css
├── services/
│   └── api.js          (Centralized API calls)
├── hooks/
│   └── useCart.js      (Custom cart hook)
├── styles/
│   └── global.css      (Global styles)
├── App.jsx             (React Router setup)
└── main.jsx            (Entry point)
```

## Installation Required

### 1. Install React Router DOM

```bash
npm install react-router-dom
```

This is required for the navigation between pages (Home, Cart, etc.).

## Key Features Implemented

### 1. **React Router Navigation**
- Home page (`/`)
- Shop page (`/shop`)
- Product details (`/product/:id`)
- Shopping cart (`/cart`)

### 2. **Custom useCart Hook**
- Add/remove items from cart
- Update quantities
- Calculate totals
- Persist cart to localStorage
- Get item count

### 3. **Centralized API Service**
- `fetchProducts()` - Get all products
- `fetchProductById(id)` - Get single product
- `subscribeNewsletter(email)` - Newsletter subscription

### 4. **Component-Based Structure**
- Navbar component with navigation links
- Footer component
- ProductCard component with "Add to Cart" functionality
- Home page with hero, products, features, and newsletter
- Cart page with quantity controls
- ProductDetails page (expandable for individual products)

### 5. **Global Styling**
- CSS variables for consistent theming
- Responsive design (mobile-first)
- Utility classes for common patterns
- Component-scoped CSS files

### 6. **Best Practices**
- Separation of concerns
- Reusable components
- Clean prop passing
- State management with hooks
- localStorage for persistence

## Setup Instructions

### 1. Navigate to frontend directory
```bash
cd front
```

### 2. Install dependencies
```bash
npm install react-router-dom
```

### 3. Start development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## Usage Examples

### Adding Product to Cart
```jsx
import { useCart } from '../hooks/useCart';

function MyComponent() {
  const { addToCart } = useCart();
  
  const handleClick = () => {
    addToCart(productObject);
  };
  
  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### Fetching Data
```jsx
import { fetchProducts } from '../services/api';

useEffect(() => {
  fetchProducts()
    .then(products => setProducts(products))
    .catch(error => console.error(error));
}, []);
```

### Using Cart in Components
```jsx
import { useCart } from '../hooks/useCart';

function CartInfo() {
  const { cartItems, getTotal, getItemCount } = useCart();
  
  return (
    <div>
      <p>Items: {getItemCount()}</p>
      <p>Total: ${getTotal().toFixed(2)}</p>
    </div>
  );
}
```

## Environment Variables

Create a `.env.local` file (if needed):
```
VITE_API_URL=http://localhost:5000
```

The app defaults to `http://localhost:5000` if not specified.

## File Migration Summary

### Removed Files (No longer needed)
- `script.js` - DOM manipulation code replaced with React components
- `api.js` (old) - Now in `services/api.js` with better organization
- Old component files in `components/` - Reorganized into subdirectories

### Migrated Code
- Header component → Navbar (with improved styling)
- Footer component (same, now with better styling)
- ProductCard (enhanced with cart functionality)
- All CSS consolidated with component-scoped files

## Next Steps

1. **Install dependencies**: `npm install react-router-dom`
2. **Test the application**: `npm run dev`
3. **Verify backend**: Ensure your backend server is running on port 5000
4. **Add features** as needed:
   - Implement product details page with actual data
   - Add user authentication
   - Implement checkout process
   - Add search/filtering

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### React Router not found
- Make sure you ran: `npm install react-router-dom`

### Products not loading
- Check that your backend server is running on `http://localhost:5000`
- Check browser console for errors

### Cart not persisting
- Cart is saved to localStorage automatically
- Clear localStorage if you encounter issues: `localStorage.clear()`

## Questions or Issues?

Refer to the comments in the code files for more context on each component and hook.
