document.addEventListener("DOMContentLoaded", function () {

    const cartButtons = document.querySelectorAll(".cart-btn");
    const cartIcon = document.getElementById("cartIcon");
    const cartModal = document.getElementById("cartModal");
    const closeCart = document.getElementById("closeCart");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCartCount();

    cartButtons.forEach(button => {
        button.addEventListener("click", function () {

            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: this.dataset.price
            };

            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();
            alert("Added to cart!");
        });
    });

    cartIcon.addEventListener("click", function () {
        renderCart();
        cartModal.style.display = "block";
    });

    closeCart.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
            return;
        }

        cart.forEach(item => {
            cartItemsContainer.innerHTML += `
                <div>
                    <strong>${item.name}</strong> - Ksh ${item.price}
                </div>
            `;
        });
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

});