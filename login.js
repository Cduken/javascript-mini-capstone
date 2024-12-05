function showRegister() {
    document.getElementById("left-panel").classList.toggle("move-right");
    document.querySelector(".right").classList.toggle("move-left");
    document.getElementById("login").classList.toggle("hidden");
    document.getElementById("register").classList.toggle("hidden");

    const leftPanel = document.getElementById("left-panel");
    const button = document.querySelector(".register-button");

    document.getElementById("welcome-text").textContent = leftPanel.classList.contains("move-right") ? "Welcome Back!" : "Hello, Welcome!";
    document.getElementById("prompt-text").textContent = leftPanel.classList.contains("move-right") ? "Already have an account?" : "Don't have an account?";

    button.textContent = leftPanel.classList.contains("move-right") ? "Login" : "Register";
}

function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const email = document.getElementById("register-email").value;

    if (!email.includes("@")) {
        alert('Please enter a valid email address!');
        return;
    }

    if (username && password && email) {
        const existingUser = JSON.parse(localStorage.getItem('user'));
        if (existingUser && (existingUser.username === username || existingUser.email === email)) {
            alert('User already exists! Please log in.');
            return;
        }

        const user = {
            username,
            password,
            email
        };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Registration successful!');

        // Clear input fields
        document.getElementById("register-username").value = '';
        document.getElementById("register-password").value = '';
        document.getElementById("register-email").value = '';

        showRegister();
    } else {
        alert('Please fill in all fields!');
    }
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem('isLoggedIn', 'true'); // Set login status
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password!');
    }

    // Clear input fields
    document.getElementById("login-username").value = '';
    document.getElementById("login-password").value = '';
}
