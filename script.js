const productGrid = document.getElementById('productGrid');
const newsletterForm = document.getElementById('newsletterForm');

function renderProducts(products) {
  if (!productGrid) return;

  productGrid.innerHTML = products
    .map(
      (product) => `
      <article class="product-card">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price.toFixed(2)}</div>
      </article>
    `
    )
    .join('');
}

async function loadProducts() {
  try {
    const response = await fetch('http://localhost:5000/api/products');
    if (!response.ok) {
      throw new Error('Unable to fetch products');
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    productGrid.innerHTML = '<p>Unable to load products. Please start the backend server.</p>';
    console.error(error);
  }
}

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks for subscribing to Giftoria updates!');
    newsletterForm.reset();
  });
}

loadProducts();
