document.addEventListener("DOMContentLoaded", () => {
    const buyerBtn = document.getElementById("buyer-btn");
    const sellerBtn = document.getElementById("seller-btn");
    const buyerForm = document.getElementById("buyer-form");
    const sellerForm = document.getElementById("seller-form");

    // Toggle to show the buyer form
    buyerBtn.addEventListener("click", () => {
        buyerBtn.classList.add("active");
        sellerBtn.classList.remove("active");
        buyerForm.classList.remove("hidden");
        sellerForm.classList.add("hidden");
    });

    // Toggle to show the seller form
    sellerBtn.addEventListener("click", () => {
        sellerBtn.classList.add("active");
        buyerBtn.classList.remove("active");
        sellerForm.classList.remove("hidden");
        buyerForm.classList.add("hidden");
    });
});
