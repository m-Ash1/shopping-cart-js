document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Check if email is already registered
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      errorMessage.textContent = "Email already registered!";
      errorMessage.classList.remove("hidden");
      return;
    }

    // Register the new user
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to login page after successful registration
    window.location.href = "login.html";
  });
