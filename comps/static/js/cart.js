document.addEventListener("DOMContentLoaded", function () {

    console.log("Cart JS Loaded ✅");

    let currentProduct = null;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartIcon = document.getElementById("cartIcon");
    const cartModal = document.getElementById("cartModal");
    const closeCart = document.getElementById("closeCart");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartCount = document.getElementById("cart-count");
    const addToCartBtn = document.getElementById("modalAddToCart");
    const productModal = document.getElementById("productModal");

    // ===============================
    // UPDATE CART COUNT
    // ===============================
    function updateCartCount() {
        if (cartCount) {
            cartCount.innerText = cart.length;
        }
    }

    updateCartCount();

    // ===============================
    // OPEN PRODUCT MODAL
    // ===============================
    window.openModal = function (p) {

        console.log("Opening modal for:", p);

        currentProduct = p;

        document.getElementById("modalTitle").innerText = p.name;
        document.getElementById("modalPrice").innerText = "Ksh " + p.price;
        document.getElementById("modalImage").src = p.image;

        productModal.style.display = "block";
    };

    // ===============================
    // CLOSE PRODUCT MODAL
    // ===============================
    window.closeModal = function () {
        productModal.style.display = "none";
    };

    // ===============================
    // ADD TO CART
    // ===============================
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", function () {

            if (!currentProduct) {
                console.log("No product selected ❌");
                return;
            }

            cart.push(currentProduct);
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();
            alert("Added to cart ✅");
        });
    }

    // ===============================
    // OPEN CART MODAL
    // ===============================
    if (cartIcon) {
        cartIcon.addEventListener("click", function (e) {
            e.preventDefault();
            renderCart();
            cartModal.style.display = "block";
        });
    }

    // ===============================
    // CLOSE CART MODAL
    // ===============================
    if (closeCart) {
        closeCart.addEventListener("click", function () {
            cartModal.style.display = "none";
        });
    }

    // ===============================
    // RENDER CART ITEMS
    // ===============================
    function renderCart() {

        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {

            total += parseFloat(item.price);

            cartItemsContainer.innerHTML += `
                <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>Ksh ${item.price}</small>
                    </div>
                    <button onclick="removeItem(${index})" 
                            style="background:red; color:white; border:none; padding:5px 8px; cursor:pointer;">
                        X
                    </button>
                </div>
            `;
        });

        cartItemsContainer.innerHTML += `
            <hr>
            <h3>Total: Ksh ${total}</h3>
        `;
    }

    // ===============================
    // REMOVE ITEM
    // ===============================
    window.removeItem = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        renderCart();
    };

});