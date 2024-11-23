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
document.addEventListener("DOMContentLoaded", () => {
    // Cart Management
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
        const removedItem = cart.splice(index, 1);
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
});

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
document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { 
            name: "Hemp Oil", 
            seller: "John's Hemp", 
            location: "Denver, USA", 
            price: "19.99", 
            unit: "per liter", 
            description: "Organic hemp oil for wellness.", 
            image: "/assets/images/hemp-oil.jpg" 
        },
        { 
            name: "Hemp Lotion", 
            seller: "Green Glow", 
            location: "Seattle, USA", 
            price: "14.99", 
            unit: "per bottle", 
            description: "Moisturizing hemp lotion for skincare.", 
            image: "/assets/images/hemp-lotion.jpg" 
        },
        // Add more predefined products
    ];

    const productList = document.getElementById("product-list");
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search");
    const addProductForm = document.getElementById("add-product-form");

    // Render Products
    const renderProducts = (query = "") => {
        productList.innerHTML = ""; // Clear the product list
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
                        <p><strong>Price:</strong> $${product.price} ${product.unit}</p>
                        <p>${product.description}</p>
                        <button class="btn" onclick="addToCart('${product.name}')">Add to Cart</button>
                    </div>
                `;
                productList.insertAdjacentHTML("beforeend", productHTML);
            });
        } else {
            productList.innerHTML = "<p>No products match your search. Please try a different term.</p>";
        }
    };

    // Initialize with all products
    if (productList) renderProducts();

    // Handle Search
    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            renderProducts(query);
        });
    }

    // Handle Adding New Products
    if (addProductForm) {
        addProductForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newProduct = {
                name: document.getElementById("product-name").value,
                seller: document.getElementById("product-seller").value,
                location: document.getElementById("product-location").value,
                price: document.getElementById("product-price").value,
                unit: document.getElementById("product-unit").value,
                description: document.getElementById("product-description").value,
                image: document.getElementById("product-image").value,
            };
            products.push(newProduct);
            alert("Product added successfully!");
            addProductForm.reset();
        });
    }

    // Cart Functionality
    let cart = [];
    window.addToCart = (productName) => {
        cart.push(productName);
        alert(`${productName} has been added to your cart.`);
    };
});
document.addEventListener("DOMContentLoaded", () => {
    const dbName = "HempHorizonDB";
    let db;

    // Initialize IndexedDB
    const openRequest = indexedDB.open(dbName, 1);

    openRequest.onupgradeneeded = (e) => {
        db = e.target.result;

        // Create user store
        if (!db.objectStoreNames.contains("users")) {
            const userStore = db.createObjectStore("users", { keyPath: "username" });
            userStore.createIndex("password", "password", { unique: false });
        }

        // Create product store
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

    // Add User to Database
    const addUser = (user) => {
        const transaction = db.transaction("users", "readwrite");
        const store = transaction.objectStore("users");
        const request = store.add(user);

        request.onsuccess = () => {
            alert("User registered successfully.");
        };

        request.onerror = (e) => {
            alert("Error registering user: " + e.target.error);
        };
    };

    // Validate Login
    const validateLogin = (username, password) => {
        const transaction = db.transaction("users", "readonly");
        const store = transaction.objectStore("users");
        const request = store.get(username);

        request.onsuccess = (e) => {
            const user = e.target.result;
            if (user && user.password === password) {
                alert("Login successful!");
                // Redirect to Marketplace or another page
                window.location.href = "search.html";
            } else {
                alert("Invalid username or password.");
            }
        };

        request.onerror = () => {
            alert("Error fetching user details.");
        };
    };

    // Add Product to Database
    const addProduct = (product) => {
        const transaction = db.transaction("products", "readwrite");
        const store = transaction.objectStore("products");
        store.add(product);
    };

    // Handle Registration
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

    // Handle Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            validateLogin(username, password);
        });
    }

    // Handle Adding Products
    const addProductForm = document.getElementById("add-product-form");
    if (addProductForm) {
        addProductForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newProduct = {
                name: document.getElementById("product-name").value,
                seller: document.getElementById("product-seller").value,
                location: document.getElementById("product-location").value,
                price: document.getElementById("product-price").value,
                unit: document.getElementById("product-unit").value,
                description: document.getElementById("product-description").value,
                image: document.getElementById("product-image").value,
            };
            addProduct(newProduct);
            alert("Product added successfully!");
            addProductForm.reset();
        });
    }
});
