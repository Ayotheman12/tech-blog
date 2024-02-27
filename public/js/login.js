// Log the user in
const handleLogin = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"}
        });

        if (response.ok) {
            location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}

// Create a new user

// Switch between Login and Sign Up
const handleSwitch = (event) => {
    if (event.target.dataset["form-type"] === "login") {
        document.querySelector("#form-title").innerHTML = "Sign Up";
        document.querySelector("#submit-button").innerHTML = "Sign Up";
        document.querySelector("#switch-button").innerHTML = "Log In Instead?";
        document.querySelector("#switch-button").setAttribute("data-form-type", "signup");
    } else {
        document.querySelector("#form-title").innerHTML = "Log In";
        document.querySelector("#submit-button").innerHTML = "Log In";
        document.querySelector("#switch-button").innerHTML = "Sign Up Instead?";
        document.querySelector("#switch-button").setAttribute("data-form-type", "login");
    }
}

// Add event listeners
document.querySelector("#login-form").addEventListener("submit", handleLogin);
document.querySelector("#signup-form").addEventListener("submit", handleSignup);
document.querySelector("#switch-button").addEventListener("click", handleSwitch);