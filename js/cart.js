document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");

  // Load cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to update total price
  function updateTotalPrice() {
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
    totalPriceElement.textContent = totalPrice.toFixed(2); // Set the total price
  }

  // Function to remove item from cart
  function removeItemFromCart(productId) {
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1); // Remove item from cart
      localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
      displayCartItems(); // Refresh the cart display
      updateTotalPrice(); // Update total price
    }
  }

  // Function to display cart items dynamically
  function displayCartItems() {
    cartItemsContainer.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="text-center text-gray-500">Your cart is empty!</p>';
    } else {
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "flex",
          "justify-between",
          "items-center",
          "bg-white",
          "p-4",
          "rounded",
          "shadow-lg"
        );
        cartItem.innerHTML = `
                    <div class="flex items-center">
                        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded mr-4">
                        <div>
                            <h3 class="text-lg font-bold">${item.name}</h3>
                            <p class="text-gray-600">$${item.price}</p>
                        </div>
                    </div>
                    <button class="remove-item bg-red-500 text-white p-2 rounded" data-id="${item.id}">Remove</button>
                `;
        cartItemsContainer.appendChild(cartItem);
      });
    }

    // Add event listeners to the "Remove" buttons
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"), 10);
        removeItemFromCart(productId);
      });
    });
  }

  // Initial display and price update
  displayCartItems();
  updateTotalPrice();
});
