document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is a great product.",
      price: 10.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is another great product.",
      price: 14.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      description: "You will love this product.",
      price: 7.99,
      image: "https://via.placeholder.com/150",
    },
  ];

  const productList = document.getElementById("productList");
  const toast = document.getElementById("toast"); // Toast notification element
  const cartCounter = document.getElementById("cartCounter"); // Cart counter element

  // Load existing cart from localStorage or create an empty array
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to update cart counter
  function updateCartCounter() {
    cartCounter.textContent = cart.length; // Set counter to the number of items in the cart
  }

  // Call updateCartCounter when the page loads
  updateCartCounter();

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("bg-white", "p-4", "rounded", "shadow-lg");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
            <h3 class="text-lg font-bold">${product.name}</h3>
            <p class="text-gray-600">${product.description}</p>
            <p class="font-bold text-xl mt-2">$${product.price}</p>
            <button class="bg-blue-500 text-white p-2 rounded mt-4 w-full add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
    productList.appendChild(productCard);
  });

  productList.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = e.target.getAttribute("data-id");
      const selectedProduct = products.find(
        (product) => product.id == productId
      );

      // Add product to cart array
      cart.push(selectedProduct);
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCounter();

      // Show the toast notification
      showToast(`${selectedProduct.name} has been added to your cart!`);
    }
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("opacity-0");
    toast.classList.add("opacity-100");

    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
    }, 3000);
  }

  function loadCartItems() {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");

    // Function to update total price
    function updateTotalPrice() {
      const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
      totalPriceElement.textContent = totalPrice.toFixed(2); // Set the total price
    }

    // Function to remove item from cart
    function removeItemFromCart(productId) {
      const itemIndex = cart.findIndex((item) => item.id === productId);
      if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
        updateTotalPrice();
      }
    }

    function displayCartItems() {
      cartItemsContainer.innerHTML = "";

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
  }

  if (window.location.pathname.includes("cart.html")) {
    loadCartItems();
  }
});

// logout
function logout() {
  window.location.href = "logout.html";
}
