// Log the user out
const handleLogout = async () => {
    // Send a log out request
    const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {"Content-Type": "application/json"}
    });

    // If successful, redirect to the homepage. Else, alert the user.
    if (response.ok) {
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
}

// Add event listener
document.querySelector("#logout").addEventListener("click", handleLogout);