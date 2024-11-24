document.addEventListener("DOMContentLoaded", () => {
    // ========================
    // Form Toggling for Registration
    // ========================
    const buyerBtn = document.getElementById("buyer-btn");
    const sellerBtn = document.getElementById("seller-btn");
    const buyerForm = document.getElementById("buyer-form");
    const sellerForm = document.getElementById("seller-form");

    if (buyerBtn && sellerBtn && buyerForm && sellerForm) {
        const toggleForms = (activeBtn, inactiveBtn, showForm, hideForm) => {
            activeBtn.classList.add("active");
            inactiveBtn.classList.remove("active");
            showForm.classList.remove("hidden");
            hideForm.classList.add("hidden");
        };

        buyerBtn.addEventListener("click", () => {
            toggleForms(buyerBtn, sellerBtn, buyerForm, sellerForm);
        });

        sellerBtn.addEventListener("click", () => {
            toggleForms(sellerBtn, buyerBtn, sellerForm, buyerForm);
        });
    }

    // ========================
    // Marketplace Search and Product Rendering
    // ========================
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search");
    const productList = document.getElementById("product-list");

    const products = [
        { name: "Hemp Oil", seller: "John's Hemp", location: "Denver, USA", price: 19.99, unit: "per liter", description: "Organic hemp oil for wellness.", image: "/assets/images/hemp-oil.jpg" },
        { name: "Hemp Lotion", seller: "Green Glow", location: "Seattle, USA", price: 14.99, unit: "per bottle", description: "Moisturizing hemp lotion for skincare.", image: "/assets/images/hemp-lotion.jpg" },
        { name: "Hemp Seeds", seller: "Nature's Best", location: "Austin, USA", price: 9.99, unit: "per pack", description: "High-quality hemp seeds for planting or consumption.", image: "/assets/images/hemp-seeds.jpg" },
        { name: "CBD Gummies", seller: "Hemp Delights", location: "Miami, USA", price: 24.99, unit: "per jar", description: "Tasty CBD-infused gummies for relaxation.", image: "/assets/images/cbd-gummies.jpg" },
        { name: "Hemp Tea", seller: "Relaxing Herbs", location: "Portland, USA", price: 12.99, unit: "per box", description: "Soothing and relaxing hemp-based tea.", image: "/assets/images/hemp-tea.jpg" },
        { name: "Hemp Protein", seller: "HealthNut", location: "San Diego, USA", price: 29.99, unit: "per tub", description: "Nutrient-packed hemp protein powder.", image: "/assets/images/hemp-protein.jpg" },
    ];

    if (searchForm && searchInput && productList) {
        const renderProducts = (query = "") => {
            productList.innerHTML = "";
            const filteredProducts = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );

            if (filteredProducts.length > 0) {
                filteredProducts.forEach((product) => {
                    const productHTML = `
                        <div class="product-item">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p><strong>Seller:</strong> ${product.seller}</p>
                            <p><strong>Location:</strong> ${product.location}</p>
                            <p><strong>Price:</strong> $${product.price.toFixed(2)} ${product.unit}</p>
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

        renderProducts(); // Render all products on page load

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            renderProducts(query);
        });
    }

    // ========================
    // Cart Management
    // ========================
    let cart = [];
    const cartItems = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");

    window.addToCart = (productName) => {
        cart.push(productName);
        alert(`${productName} has been added to your cart.`);
        updateCartDisplay();
    };

    const updateCartDisplay = () => {
        if (cartItems) {
            if (cart.length > 0) {
                cartItems.innerHTML = cart
                    .map((item, index) => `
                        <li class="cart-item">
                            ${item}
                            <button class="btn secondary" onclick="removeFromCart(${index})">Remove</button>
                        </li>
                    `)
                    .join("");
            } else {
                cartItems.innerHTML = "<p>Your cart is empty.</p>";
            }
        }
    };

    window.removeFromCart = (index) => {
        const removedItem = cart.splice(index, 1)[0];
        alert(`${removedItem} has been removed from your cart.`);
        updateCartDisplay();
    };

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

    // ========================
    // IndexedDB Integration for User and Product Management
    // ========================
    const dbName = "HempHorizonDB";
    let db;

    const openRequest = indexedDB.open(dbName, 1);

    openRequest.onupgradeneeded = (e) => {
        db = e.target.result;

        if (!db.objectStoreNames.contains("users")) {
            const userStore = db.createObjectStore("users", { keyPath: "username" });
            userStore.createIndex("password", "password", { unique: false });
        }

        if (!db.objectStoreNames.contains("products")) {
            db.createObjectStore("products", { autoIncrement: true });
        }
    };

    openRequest.onsuccess = (e) => {
        db = e.target.result;
        console.log("Database initialized successfully.");
    };

    openRequest.onerror = (e) => {
        console.error("Error initializing database:", e.target.errorCode);
    };

    const addUser = (user) => {
        const transaction = db.transaction("users", "readwrite");
        const store = transaction.objectStore("users");
        store.add(user).onsuccess = () => {
            alert("User registered successfully.");
        };
    };

    const validateLogin = (username, password) => {
        const transaction = db.transaction("users", "readonly");
        const store = transaction.objectStore("users");
        store.get(username).onsuccess = (e) => {
            const user = e.target.result;
            if (user && user.password === password) {
                alert("Login successful!");
                window.location.href = "search.html";
            } else {
                alert("Invalid username or password.");
            }
        };
    };

    const addProductToDB = (product) => {
        const transaction = db.transaction("products", "readwrite");
        const store = transaction.objectStore("products");
        store.add(product).onsuccess = () => {
            alert("Product added successfully!");
        };
    };

    // ========================
    // Handle User Registration and Login
    // ========================
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newUser = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
            };
            addUser(newUser);
        });
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            validateLogin(username, password);
        });
    }

    // ========================
    // Handle Adding New Products
    // ========================
    const addProductForm = document.getElementById("add-product-form");
    if (addProductForm) {
        addProductForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newProduct = {
                name: document.getElementById("product-name").value,
                seller: document.getElementById("product-seller").value,
                location: document.getElementById("product-location").value,
                price: parseFloat(document.getElementById("product-price").value),
                unit: document.getElementById("product-unit").value,
                description: document.getElementById("product-description").value,
                image: document.getElementById("product-image").value,
            };
            addProductToDB(newProduct);
            addProductForm.reset();
        });
    }
});
