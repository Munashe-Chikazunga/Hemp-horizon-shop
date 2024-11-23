document.addEventListener("DOMContentLoaded", () => {
    // Form Toggling for Registration Page
    const buyerBtn = document.getElementById("buyer-btn");
    const sellerBtn = document.getElementById("seller-btn");
    const buyerForm = document.getElementById("buyer-form");
    const sellerForm = document.getElementById("seller-form");

    if (buyerBtn && sellerBtn && buyerForm && sellerForm) {
        buyerBtn.addEventListener("click", () => {
            buyerBtn.classList.add("active");
            sellerBtn.classList.remove("active");
            buyerForm.classList.remove("hidden");
            sellerForm.classList.add("hidden");
        });

        sellerBtn.addEventListener("click", () => {
            sellerBtn.classList.add("active");
            buyerBtn.classList.remove("active");
            sellerForm.classList.remove("hidden");
            buyerForm.classList.add("hidden");
        });
    }

    // Marketplace Search Functionality
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search");
    const productList = document.getElementById("product-list");

    if (searchForm && searchInput && productList) {
        const products = [
            { name: "Hemp Oil", description: "Organic hemp oil for wellness", image: "/assets/images/hemp-oil.jpg" },
            { name: "Hemp Lotion", description: "Moisturizing hemp lotion", image: "/assets/images/hemp-lotion.jpg" },
            { name: "Hemp Seeds", description: "High-quality hemp seeds", image: "/assets/images/hemp-seeds.jpg" },
            { name: "CBD Gummies", description: "Tasty CBD-infused gummies", image: "/assets/images/cbd-gummies.jpg" },
            { name: "Hemp Tea", description: "Relaxing hemp-based tea", image: "/assets/images/hemp-tea.jpg" },
            { name: "Hemp Protein", description: "Nutrient-packed hemp protein powder", image: "/assets/images/hemp-protein.jpg" },
        ];

        // Render products based on the search query
        const renderProducts = (query) => {
            productList.innerHTML = ""; // Clear current products
            const filteredProducts = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );

            if (filteredProducts.length > 0) {
                filteredProducts.forEach((product) => {
                    const productHTML = `
                        <div class="product-item">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <button class="btn" onclick="addToCart('${product.name}')">Add to Cart</button>
                        </div>
                    `;
                    productList.insertAdjacentHTML("beforeend", productHTML);
                });
            } else {
                productList.innerHTML = "<p>No products found. Try a different search term.</p>";
            }
        };

        // Initialize marketplace with all products
        renderProducts("");

        // Search handler
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            renderProducts(query);
        });
    }

    // Cart Functionality
    let cart = [];
    const cartItems = document.getElementById("cart-items");

    window.addToCart = (productName) => {
        cart.push(productName);
        alert(`${productName} has been added to your cart.`);
        updateCartDisplay();
    };

    const updateCartDisplay = () => {
        if (cartItems) {
            if (cart.length > 0) {
                cartItems.innerHTML = cart
                    .map((item) => `<li>${item} <button class="btn secondary" onclick="removeFromCart('${item}')">Remove</button></li>`)
                    .join("");
            } else {
                cartItems.innerHTML = "<p>Your cart is empty.</p>";
            }
        }
    };

    window.removeFromCart = (productName) => {
        cart = cart.filter((item) => item !== productName);
        alert(`${productName} has been removed from your cart.`);
        updateCartDisplay();
    };

    // Checkout Simulation
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (cart.length > 0) {
                alert("Checkout successful! Thank you for your purchase.");
                cart = [];
                updateCartDisplay();
            } else {
                alert("Your cart is empty. Add items to proceed.");
            }
        });
    }
});
