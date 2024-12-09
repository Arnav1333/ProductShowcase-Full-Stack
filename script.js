
const apiUrl = "https://drf-crud-api.onrender.com/api/items/";

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query)
      );
      displayProducts(filteredProducts);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    productList.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}

function displayProducts(products) {
  productList.innerHTML = products
    .map(
      product => `
        <div class="product-card">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p class="price">Price: ₹${product.price}</p>
          <p class="date">Added on: ${new Date(product.created_at).toLocaleDateString()}</p>
        </div>
      `
    )
    .join("");
}

fetchProducts();
