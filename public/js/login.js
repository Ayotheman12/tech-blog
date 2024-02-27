// Handle a submission to the login/signup form
const handleLoginSignup = (event) => {
    event.preventDefault();

    if (event.target.dataset.formType === "login") {
        login();
    } else {
        signup();
    }
}

// Log the user in
const login = async () => {
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

// Sign up a new user
const signup = async () => {
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    console.log(username, password)

    if (username && password) {
        const response = await fetch("/api/users", {
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

// Switch between Login and Sign Up
const handleSwitch = (event) => {
    if (event.target.dataset.formType === "login") {
        document.querySelector("#form-title").innerHTML = "Sign Up";
        document.querySelector("#submit-button").innerHTML = "Sign Up";
        document.querySelector("#switch-button").innerHTML = "Log In Instead?";
        document.querySelector("#login-signup-form").setAttribute("data-form-type", "signup");
        document.querySelector("#switch-button").setAttribute("data-form-type", "signup");
    } else {
        document.querySelector("#form-title").innerHTML = "Log In";
        document.querySelector("#submit-button").innerHTML = "Log In";
        document.querySelector("#switch-button").innerHTML = "Sign Up Instead?";
        document.querySelector("#login-signup-form").setAttribute("data-form-type", "login");
        document.querySelector("#switch-button").setAttribute("data-form-type", "login");
    }
}

// Add event listeners
document.querySelector("#login-signup-form").addEventListener("submit", handleLoginSignup);
document.querySelector("#switch-button").addEventListener("click", handleSwitch);