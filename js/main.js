function register() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;

  message = document.getElementById("message");

  if (!name || !email || !password) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.textContent = "Invalid email format.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.some(user => user.email === email)) {
    message.textContent = "Email already exists. Try another one.";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registration successful! Redirecting...";
  setTimeout(() => window.location.href = "index.html", 1000);
}

function login() {
  var email = document.getElementById("loginEmail").value.trim();
  var password = document.getElementById("loginPassword").value;

  message = document.getElementById("loginMessage");

  users = JSON.parse(localStorage.getItem("users") || "[]");

  currentUser = users.find(user => user.email === email && user.password === password);

  if (!currentUser) {
    message.textContent = "Incorrect email or password.";
    return;
  }

  sessionStorage.setItem("loggedInUser", JSON.stringify(currentUser));
  window.location.href = "home.html";
}

function checkLogin() {
  user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("username").textContent = user.name;
}


function logout() {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
