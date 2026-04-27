# Giftoria Frontend

A React + Vite frontend for the Giftoria ecommerce project.

## Setup

1. Open a terminal in `front/`
2. Run `npm install`
3. Run `npm run dev`
4. Open the local Vite URL shown in the terminal, usually `http://localhost:5173`

## Backend

Start the backend first from `back/` so product data can load from `http://localhost:5000/api/products`.

## Notes

- The app uses React components, a header/footer layout, product cards, and a newsletter form.
- Product data is fetched from the backend API.
- If your backend runs on a different port, set `VITE_API_URL` in a `.env` file.
