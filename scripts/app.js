const cart = [];

function addToCart(productName) {
    cart.push(productName);
    alert(`${productName} has been added to your cart.`);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `<li>${item}</li>`).join('');
    }
}

function checkout() {
    alert('Checkout successful! Thank you for your purchase.');
    cart.length = 0;
    updateCart();
}

