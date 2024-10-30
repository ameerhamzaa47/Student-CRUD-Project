interface User {
    username: string;
    email: string;
    password: string;
  }
  
  // Register user function
  function registerUser() {
    const username = (document.getElementById("register-username") as HTMLInputElement).value;
    const email = (document.getElementById("register-email") as HTMLInputElement).value;
    const password = (document.getElementById("register-password") as HTMLInputElement).value;
  
    if (username && email && password) {
      const user: User = { username, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Registration successful! Redirecting to login page.");
      window.location.href = "login.html";
    } else {
      alert("Please fill out all fields.");
    }


  }
  
  // Login user function
  function loginUser() {
    const email = (document.getElementById("login-email") as HTMLInputElement).value;
    const password = (document.getElementById("login-password") as HTMLInputElement).value;
    const userData = localStorage.getItem("user");
  
    if (userData) {
      const user: User = JSON.parse(userData);
  
      if (user.email === email && user.password === password) {
        alert("Login successful!");
        window.location.href = "home.html";
      } else {
        alert("Invalid email or password.");
      }
    } else {
      alert("No registered user found. Please register first.");
    }

  }
  