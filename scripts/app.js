document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    const productList = document.getElementById('product-list');

    const products = [
        { name: 'Hemp Oil', price: 19.99 },
        { name: 'Hemp Lotion', price: 14.99 },
        { name: 'Hemp Seeds', price: 9.99 },
    ];

    const results = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );

    productList.innerHTML = results.map(product => `
        <div class="product-item">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="btn">Add to Cart</button>
        </div>
    `).join('');
});
document.addEventListener("DOMContentLoaded", function () {
    const buyerBtn = document.getElementById("buyer-btn");
    const sellerBtn = document.getElementById("seller-btn");
    const buyerForm = document.getElementById("buyer-form");
    const sellerForm = document.getElementById("seller-form");

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
});
