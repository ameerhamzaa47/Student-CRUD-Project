// Register user function
function registerUser() {
    var username = document.getElementById("register-username").value;
    var email = document.getElementById("register-email").value;
    var password = document.getElementById("register-password").value;
    if (username && email && password) {
        var user = { username: username, email: email, password: password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Registration successful! Redirecting to login page.");
        window.location.href = "User/login.html";
    }
    else {
        alert("Please fill out all fields.");
    }
}
// Login user function
function loginUser() {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    var userData = localStorage.getItem("user");
    if (userData) {
        var user = JSON.parse(userData);
        if (user.email === email && user.password === password) {
            alert("Login successful!");
            window.location.href = "home.html";
        }
        else {
            alert("Invalid email or password.");
        }
    }
    else {
        alert("No registered user found. Please register first.");
    }
}
