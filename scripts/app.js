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
