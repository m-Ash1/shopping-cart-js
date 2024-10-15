document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is already logged in
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    window.location.href = "home.html";
  }
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the user exists and if the password matches
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    // Log in user (store in localStorage to maintain login status)
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Redirect to home page after successful login
    window.location.href = "home.html";
  } else {
    errorMessage.textContent = "Invalid email or password!";
    errorMessage.classList.remove("hidden");
  }
});
