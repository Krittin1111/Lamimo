// Maximum allowed items in the cart
const MAX_CART_ITEMS = 50;

// Cart count variable
let cartCount = 0;

// Get elements
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Function to add item to the cart
function addToCart() {
    if (cartCount >= MAX_CART_ITEMS) {
        alert('You cannot add more than 50 items to the cart.');
        return;
    }

    // Increment cart count
    cartCount++;
    updateCartCount();
    alert('Item added to cart!');
}

// Function to update cart count on the page
function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

// Attach click event to all "Add to Cart" buttons
addToCartButtons.forEach((button) => {
    button.addEventListener('click', addToCart);
});
